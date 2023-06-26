import React from "react";
import { View, Text, ImageBackground } from "react-native";

import { vh, vw } from "../../../utils/dimensions";
import styles from "./styles";

const VenueCard = ({ name, image }) => {
  return (
    <ImageBackground style={styles.container} imageStyle={styles.image} source={{ uri: image }}>
      <Text style={styles.name}>{name}</Text>
    </ImageBackground>
  );
};

export default VenueCard;
