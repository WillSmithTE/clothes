import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import { clothes } from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import { ClothingItem } from "../types";
import { api } from "../api";
import { AuthContext } from "../login/AuthContext";
import { Error } from "./Error";
import { Loading } from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import { LikedItem } from "../components/LikedItem";
import { CartItem } from "../components/CartItem";
import { isNotUndefined } from "../predicates";
import { Break } from "../util";

const Cart = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = React.useState<ClothingItem[] | undefined>(undefined);
  const { userId } = React.useContext(AuthContext);
  const [error, setError] = React.useState(false);
  const isFocused = useIsFocused();

  const removeItemFromListByIndex = (index: number) => {
    if (isNotUndefined(items)) {
      const copyItems = [...items]
      copyItems.splice(index)
      setItems(copyItems)
    }
  }

  useEffect(() => {
    api.getCartItems(userId).then(
      setItems,
      () => setError(true)
    );
  }, [isFocused]);

  if (error) {
    return <Error />
  } else if (items) {
    return <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerLikes}>
        <View style={styles.top}>
          <Text style={styles.title}>Cart</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        {items.length ?
          <FlatList
            numColumns={1}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <CartItem
                  removeFromList={() => removeItemFromListByIndex(index)}
                  item={item}
                />
              </TouchableOpacity>
            )}
          /> : <Empty />}
      </View>
    </ImageBackground>
  } else {
    return <Loading />
  }
}

const Empty = () => {
  return <>

    <Text>Nothing to see here...<Break/>Try adding something to your cart first</Text>
    <Text></Text>
  </>
}

export default Cart;
