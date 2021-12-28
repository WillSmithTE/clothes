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

const Likes = ({navigation}: {navigation: any}) => {
  const [clothes, setClothes] = React.useState<ClothingItem[] | undefined>(undefined);
  const { userId } = React.useContext(AuthContext);
  const [error, setError] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    api.getLikedClothesForUser(userId).then(
      setClothes,
      () => setError(true)
    );
  }, [isFocused]);

  if (error) {
    return <Error />
  } else if (clothes) {
    return <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerLikes}>
        <View style={styles.top}>
          <Text style={styles.title}>Likes</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        {clothes.length ?
          <FlatList
            numColumns={2}
            data={clothes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <LikedItem
                  item={item}
                  navigation={navigation}
                />
              </TouchableOpacity>
            )}
          /> : <EmptyLikes />}
      </View>
    </ImageBackground>
  } else {
    return <Loading />
  }
}

const EmptyLikes = () => {
  return <>
    
    <Text>Nothing to see here...<br/>Try liking something first</Text>
    <Text></Text>
  </>
}

export default Likes;
