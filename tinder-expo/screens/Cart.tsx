import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import {clothes} from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";

const Cart = () => (
  <ImageBackground
    source={require("../assets/images/bg.png")}
    style={styles.bg}
  >
    <View style={styles.containerCart}>
      <View style={styles.top}>
        <Text style={styles.title}>Cart</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={clothes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Message
              image={item.image}
              name={item.name}
              lastMessage={item.message}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </ImageBackground>
);

export default Cart;
