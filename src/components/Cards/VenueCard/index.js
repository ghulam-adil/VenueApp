import React from "react";
import { View, Text } from "react-native";

import { vh, vw } from "../../../utils/dimensions";
import styles from "./styles";

const VenueCard = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default VenueCard;
