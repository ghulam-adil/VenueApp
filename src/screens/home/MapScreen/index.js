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
      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(venues.map(({ name }) => name));
      }, 500);
    }
  }, [venues]);

  const renderCards = () => {
    return venues.map((val, i) => {
      return <VenueCard key={i} name={val.name} image={val.featured_image} />;
    });
  };

  const renderMarkers = () => {
    return venues.map((marker) => (
      <Marker
        key={marker.id}
        identifier={marker?.name}
        coordinate={{
          latitude: marker.lat,
          longitude: marker.lon,
        }}
        title={marker.name}
      />
    ))
  }

  console.log('VENUEEE', venues[0]?.name)

  const handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }

  const onMomentumScrollEnd = ({ nativeEvent }) => {
    // the current offset, {x: number, y: number} 
    const position = nativeEvent.contentOffset;
    // page index 
    const index = Math.round(nativeEvent.contentOffset.x / vw * 100);

    console.log('INDEX CHANGEDD=======>>>>>>>>', index);


    // if (index !== this.state.currentIndex) {
    //   // onPageDidChanged
    //   console.log('INDEX CHANGEDD=======>>>>>>>>');
    // }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {venues[0] != null &&
        <MapView style={styles.map} ref={mapRef}
          initialRegion={{
            latitude: venues[0]?.lat,
            longitude: venues[0]?.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {renderMarkers()}
        </MapView>
      }
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
          snapToAlignment={"center"}
          onScroll={handleScroll}
          pagingEnabled={true}
          onMomentumScrollEnd={onMomentumScrollEnd}
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
