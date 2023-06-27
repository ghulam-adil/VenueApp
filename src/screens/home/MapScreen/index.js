import React, { useEffect, useState, useRef } from "react";
import { Image, LayoutAnimation, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-snap-carousel";

import useHome from "../../../hooks/useHome";
import { vh, vw } from "../../../utils/dimensions";
import VenueCard from "../../../components/Cards/VenueCard";
import styles from "./styles";
import { useSelector } from "react-redux";

const MapScreen = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const { getVenues } = useHome();
  const venues = useSelector((state) => state.home.venues);

  const getVenuesHandler = async () => {
    try {
      const response = await getVenues();
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
        mapRef.current.fitToSuppliedMarkers([venues[0]?.name]);
      }, 500);
    }
  }, [venues]);

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
    ));
  };

  const handleChange = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIndex(index);
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers([venues[index].name]);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {venues[0] != null && (
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: venues[0]?.lat,
            longitude: venues[0]?.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {renderMarkers()}
        </MapView>
      )}
      <View style={styles.bottomContainer}>
        <View>
          <Carousel
            ref={isCarousel}
            data={venues}
            renderItem={({ item }) => (
              <VenueCard name={item.name} image={item.featured_image} />
            )}
            sliderWidth={vw * 100}
            itemWidth={vw * 80}
            onSnapToItem={handleChange}
          />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
