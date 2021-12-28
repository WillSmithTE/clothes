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

export const LikedItem = ({
  item,
  navigation,
}: { item: ClothingItem, navigation: any }) => {
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

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={item.image} style={imageStyle} />

      {/* MATCHES */}
      {/* {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Match!
          </Text>
        </View>
      )} */}

      <Text style={nameStyle}>{item.brand}</Text>

      {item.description && (
        <Text style={styles.descriptionCardItem}>{item.description}</Text>
      )}

      {item.price && (
        <Text style={styles.descriptionCardItem}>${item.price}</Text>
      )}

      <AddToCartButton item={item} navigation={navigation} />

    </View>
  );
};

const AddToCartButton = ({ item, navigation }: { item: ClothingItem, navigation: any }) => {

  const { userId } = React.useContext(AuthContext);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false)

  const addToCart = async () => {
    try {
      api.addItemToCart(userId, item)
      setIsAddedToCart(true)
    } catch (e) {
      console.error(`Something went wrong adding item to cart (userId=${userId}, item=${stringify(item)}, error=${e})`)
    }
  }

  const navigateToCart = () => navigation.navigate('Cart')

  return isAddedToCart ?
    <TouchableOpacity onPress={navigateToCart} style={{}}>
      <Svg height='30' width='100'>
        <Rect x={0} y={0} rx={5} width={100} height={30} fill={"white"} stroke='black' />
        <SvgText x='50' y='15' stroke='black' textAnchor='middle'>Go to cart</SvgText>
      </Svg>
    </TouchableOpacity > :
    <TouchableOpacity onPress={() => addToCart()} style={{}}>
      <Svg height='30' width='100'>
        <Rect x={0} y={0} rx={5} width={100} height={30} fill={"yellow"} stroke='black' />
        <SvgText x='50' y='15' stroke='black' textAnchor='middle'>Add to cart</SvgText>
      </Svg>
    </TouchableOpacity>
}

