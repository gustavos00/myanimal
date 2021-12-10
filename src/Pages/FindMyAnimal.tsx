import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import openMap from 'react-native-open-maps';

import Header from '../components/Header';
import Background from '../components/Background/index';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';

import AuthContext from '../contexts/user';
import Maps from '../components/Maps';

interface geographicDataProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

function FindMyAnimal() {
  const [haveValidAddress, setHaveValidAddress] = useState<boolean>();
  const [geographicData, setGeographicData] = useState<geographicDataProps>();
  const { user } = useContext(AuthContext);

  const route = useRoute<RouteProp<RootStackParamList, 'FindMyAnimal'>>();
  const { ownerData } = route.params;
  const { latitude, longitude } = ownerData;

  const openOnMapsHandleClick = (region: geographicDataProps) => {
    openMap(region);
  };

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
      <Header
        name={user?.givenName}
        text={'Yupi, you found a animal'}
        image={user?.imageUrl}
      />

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

              <Button
                text={'Open on maps'}
                handleClick={(geographicData: geographicDataProps) => {
                  openOnMapsHandleClick(geographicData);
                }}
              />
            </View>
          </>
        ) : (
          <></>
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
