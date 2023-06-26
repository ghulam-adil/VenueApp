import React, { useEffect, useCallback, useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

import useHome from "../../../hooks/useHome";
import { vh, vw } from "../../../utils/dimensions";
import VenueCard from "../../../components/Cards/VenueCard";

const MapScreen = () => {
  const [venues, setVenues] = useState([]);
  const { getVenues } = useHome();

  const getVenuesHandler = async () => {
    try {
      const response = await getVenues();
      console.log(
        "getVenues RESPONSE ON SCREEN======>>>>>>>>>>>",
        response.results
      );
      setVenues(response.results);
    } catch (error) {
      // showToast(error);
    }
  };

  useEffect(() => {
    getVenuesHandler();
  }, []);

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(venues.map(({ id }) => id));
    }
  }, [venues]);

  const renderCards = () => {
    return venues.map((val, i) => {
      return <VenueCard key={i} name={val.name} />;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} ref={mapRef}>
        {venues[0] != null &&
          venues.map((marker) => (
            <Marker
              key={marker.id}
              identifier={marker.id}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lon,
              }}
              title={marker.name}
            />
          ))}
      </MapView>

      <View
        style={{
          width: vw * 100,
          bottom: 0,
          position: "absolute",
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToAlignment={"center"}
          // snapToInterval={vw * 100 - (YOUR_INSET_LEFT + YOUR_INSET_RIGHT)}
          // contentInset={{
          //   top: 0,
          //   left: YOUR_INSET_LEFT,
          //   bottom: 0,
          //   right: YOUR_INSET_RIGHT,
          // }}
        >
          {renderCards()}
        </ScrollView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
