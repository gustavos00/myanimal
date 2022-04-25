import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import openMap from 'react-native-open-maps';

import Header from '../components/Header';
import Background from '../components/Background/index';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';

import Maps from '../components/Maps';
import StyledText from '../components/StyledText';

interface geographicDataProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

function FindMyAnimal() {
  const [haveValidAddress, setHaveValidAddress] = useState<boolean>();
  const [geographicData, setGeographicData] = useState<geographicDataProps>();

  const route = useRoute<RouteProp<RootStackParamList, 'FindMyAnimal'>>();
  const { ownerData } = route.params;
  const { latitude, longitude } = ownerData;

  if (longitude && latitude) {
    useEffect(() => {
      setHaveValidAddress(true);
      const { width, height } = Dimensions.get('window');
      const latitudeDelta = 0.0922;
      const longitudeDelta = latitudeDelta + width / height;

      setGeographicData({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    }, []);
  }

  return (
    <>
      <Header text={'Yupi, you found a pet'} />

      <Background>
        <BackgroundHeader text={'Find myAnimal'} />

        {haveValidAddress ? (
          <>
            <View style={styles.mapsContainer}>
              <Maps
                enableMarker={true}
                longitude={geographicData?.longitude ?? 0}
                latitude={geographicData?.latitude ?? 0}
              />
            </View>
          </>
        ) : (
          <View style={styles.addressContainer}>
            <StyledText text={'Name'} value={ownerData.name ?? ''} />
            <StyledText text={'Contact'} value={ownerData.phoneNumber} />
            <StyledText text={'Door Number'} value={ownerData.doorNumber ?? ''} />
            <StyledText text={'Street Name'} value={ownerData.streetName ?? ''} />
            <StyledText text={'Parish'} value={ownerData.parishName ?? ''} />
            <StyledText text={'Locality'} value={ownerData.locationName ?? ''} />
          </View>
        )}
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  mapsContainer: {
    flex: 1,
  },

  ownerContainer: {
    marginTop: 20,
  },

  addressContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});

export default FindMyAnimal;
