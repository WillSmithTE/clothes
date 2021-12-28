import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
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

export const LikedItem = ({
  description,
  hasVariant,
  image,
  brand,
  price,
  id,
  navigation,
}: CardItemT & {navigation: any}) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* MATCHES */}
      {/* {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Match!
          </Text>
        </View>
      )} */}

      <Text style={nameStyle}>{brand}</Text>

      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {price && (
        <Text style={styles.descriptionCardItem}>${price}</Text>
      )}

      <AddToCartButton itemId={id!!} navigation={navigation} />

    </View>
  );
};

const AddToCartButton = ({ itemId, navigation }: { itemId: string, navigation: any }) => {

  const { userId } = React.useContext(AuthContext);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false)

  const addToCart = async (id: string) => {
    try {
      api.addItemToCart(userId, id)
      setIsAddedToCart(true)
    } catch (e) {
      console.error(`Something went wrong adding item to cart (userId=${userId}, itemId=${itemId}, error=${e})`)
    }
  }

  const navigateToCart = () => navigation.navigate('Cart')

  return isAddedToCart ?
    <TouchableOpacity onPress={navigateToCart} style={{...styles.button, ...styles.clickedButton}}>
      <Text>Proceed to checkout</Text>
    </TouchableOpacity> :
    <TouchableOpacity onPress={() => addToCart(itemId)} style={styles.button}>
    <Text>Add to cart</Text>
  </TouchableOpacity>
}

