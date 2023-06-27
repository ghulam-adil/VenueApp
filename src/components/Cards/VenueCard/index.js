import React from "react";
import { Text, ImageBackground } from "react-native";

import styles from "./styles";

const VenueCard = ({ name, image }) => {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.image}
      source={{ uri: image }}
    >
      <Text style={styles.name}>{name}</Text>
    </ImageBackground>
  );
};

export default VenueCard;
