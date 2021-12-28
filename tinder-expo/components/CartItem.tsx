import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
} from "../assets/styles";
import { NumberFormat } from "./NumberFormat";
import { AuthContext } from "../login/AuthContext";
import { api } from "../api";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import { stringify } from "../util";
import { ClothingItem } from "../types";

export const CartItem = ({
  removeFromList,
  item,
}: { item: ClothingItem, removeFromList: () => void }) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth / 2 - 30,
      height: 170,
      margin: 0,
    },
  ];

  const nameStyle = [
    {
      paddingTop: 10,
      paddingBottom: 5,
      color: "#363636",
      fontSize: 15,
    },
  ];

  const { userId } = React.useContext(AuthContext);

  const removeFromCart = () => {
    removeFromList()
    api.removeFromCart(userId, item)
  }

  return (
    <View style={styles.containerCardItem}>
      <Image source={item.image} style={imageStyle} />

      <Text style={nameStyle}>{item.brand}</Text>

      {item.description && (
        <Text style={styles.descriptionCardItem}>{item.description}</Text>
      )}

      {item.price && (
        <Text style={styles.descriptionCardItem}>${item.price}</Text>
      )}

      <TouchableOpacity onPress={() => removeFromCart()} style={{}}>
        <Svg height='30' width='100'>
          <Rect x={0} y={0} rx={5} width={100} height={30} fill={"yellow"} stroke='black' />
          <SvgText x='50' y='15' stroke='black' textAnchor='middle'>Delete</SvgText>
        </Svg>
      </TouchableOpacity>

    </View>
  );
};
