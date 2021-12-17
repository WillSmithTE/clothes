import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import {clothes} from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";

const Likes = () => (
  <ImageBackground
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

      <FlatList
        numColumns={2}
        data={clothes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <CardItem
              image={item.image}
              name={item.name}
              isOnline={item.isOnline}
              hasVariant
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </ImageBackground>
);

export default Likes;
