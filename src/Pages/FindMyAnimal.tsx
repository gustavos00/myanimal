import React, { useContext, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import openMap, { createMapLink } from 'react-native-open-maps';

import Header from '../components/Header';
import Background from '../components/Background/index';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';

import AuthContext from '../contexts/user';
import Map from '../components/Maps';
import Maps from '../components/Maps';

function FindMyAnimal() {
  const { user } = useContext(AuthContext);

  const route = useRoute<RouteProp<RootStackParamList, 'FindMyAnimal'>>();
  const { ownerContacts } = route.params;

  //Static data for tests
  const { width, height } = Dimensions.get('window');
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta + width / height;

  const mapRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta,
    longitudeDelta,
  };

  const openOnMapsHandleClick = () => {
    openMap(mapRegion);
  };

  return (
    <>
      <Header
        name={user?.givenName}
        text={'Yupi, you found a animal'}
        image={user?.imageUrl}
      />

      <Background>
        <BackgroundHeader text={'Find myAnimal'} />

        {ownerContacts && (
          <>
            <View style={styles.mapsContainer}>
              <Maps
                longitude={mapRegion.longitude}
                latitude={mapRegion.latitude}
              />

              <Button
                text={'Open on maps'}
                handleClick={openOnMapsHandleClick}
              />
            </View>
          </>
        )}
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  mapsContainer: {
    flex: 0.7,
  },
});

export default FindMyAnimal;
