import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Likes, Cart, Profile } from "./screens";
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from "./assets/styles";
import TabBarIcon from "./components/TabBarIcon";
import Login from "./login/Login-UI-UX-React-Native/screens/Login";
import Signup from "./login/Login-UI-UX-React-Native/screens/Signup";
import { AuthContext } from "./login/AuthContext";
import { getStoredItemAsync, saveItem } from "./storage";
import { api } from "./api";
import jwt_decode from "jwt-decode";
import { Loading } from "./components/Loading";
import { ClothingItem } from "./types";
import { Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TOKEN_KEY = 'userToken'

const App = () => {

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const [error, setError] = React.useState(false);
  const [clothes, setClothes] = React.useState<ClothingItem[] | undefined>(undefined);

  useEffect(() => {
    if (state.userToken !== null) {
      const { user_id }: { user_id: string } = jwt_decode(state.userToken);
      api.getClothesForUser(user_id).then(
        setClothes,
        () => setError(true)
      );
    }
  }, [state.userToken]);



  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await getStoredItemAsync(TOKEN_KEY);
        console.error({userToken})
      } catch (error) {
        console.error({error})
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const token = await api.login(data)

        saveItem(TOKEN_KEY, token)

        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator>
        {(() => {
          if (error) {
            return <Stack.Screen name="Error" component={() => <Text>Something went wrong</Text>} />
          } else if (state.userToken === null) {
            return <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          } else if (clothes) {
            return <Stack.Screen
              name="Tab"
              options={{ headerShown: false, animationEnabled: false }}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    showLabel: false,
                    activeTintColor: PRIMARY_COLOR,
                    inactiveTintColor: DARK_GRAY,
                    labelStyle: {
                      fontSize: 14,
                      textTransform: "uppercase",
                      paddingTop: 10,
                    },
                    style: {
                      backgroundColor: WHITE,
                      borderTopWidth: 0,
                      marginBottom: 0,
                      shadowOpacity: 0.05,
                      shadowRadius: 10,
                      shadowColor: BLACK,
                      shadowOffset: { height: 0, width: 0 },
                    },
                  }}
                >
                  <Tab.Screen
                    name="Explore"
                    children={props => <Home clothes={clothes} {...props}/>}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="search"
                          text="Explore"
                        />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Likes"
                    component={Likes}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="heart"
                          text="Likes"
                        />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="cart"
                          text="Cart"
                        />
                      ),
                    }}
                  />

                  {/* <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="person"
                        text="Profile"
                      />
                    ),
                  }}
                /> */}
                </Tab.Navigator>
              )}
            </Stack.Screen>
          } else {
            return <Stack.Screen name="Loading" component={Loading} />
          }
        })()
        }
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
}

export default App;

const LoggedInScreens = () => {
  return
}