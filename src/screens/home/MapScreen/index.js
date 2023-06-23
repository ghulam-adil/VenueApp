import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import useHome from "../../../hooks/useHome";

const MapScreen = () => {
  const [venues, setVenues] = useState([]);
  const { getVenues } = useHome();

  const getVenuesHandler = async () => {
    try {
      const response = await getVenues();
      console.log(
        "getVenues RESPONSE ON SCREEN======>>>>>>>>>>>",
        response.data
      );
      setVenues(response.data);
    } catch (error) {
      // showToast(error);
    }
  };

  useEffect(
    useCallback(() => {
      getVenuesHandler();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
