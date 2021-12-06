import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapsProps {
  latitude: number;
  longitude: number;
  enableMarker?: boolean;
}

function Maps({ latitude, longitude, enableMarker }: MapsProps) {
  const { width, height } = Dimensions.get('window');
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta + width / height;

  const mapRegion = {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };

  return (
    <>
      <MapView
        style={styles.mapsContainer}
        region={mapRegion}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
      >
        {enableMarker && <Marker coordinate={mapRegion} title="Marker" />}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  mapsContainer: {
    flex: 1,
  },
});

export default Maps;
