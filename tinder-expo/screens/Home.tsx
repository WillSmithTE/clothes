import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import Logout from "../components/Logout";
import { api } from "../api";
import { ClothingItem } from "../types";
import {AuthContext} from "../login/AuthContext";

const Home = ({ clothes }: { clothes: ClothingItem[] }) => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);

  const { userId } = React.useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          {/* <Filters /> */}
          <Logout />
        </View>

        <CardStack
          onSwipedRight={(index) => api.likeItem(userId, clothes[index].id)}
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {clothes.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                {...item}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default Home;
