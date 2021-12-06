import React, { useContext, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import openMap, { createMapLink } from 'react-native-open-maps';

import Header from '../components/Header';
import Background from '../components/Background/index';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';

import AuthContext from '../contexts/user';

function FindMyAnimal() {
  const { width, height } = Dimensions.get('window');
  const latitudeDelta = 0.0922
  const longitudeDelta = latitudeDelta + width / height;

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta,
    longitudeDelta,
  });
  const { user } = useContext(AuthContext);

  const route = useRoute<RouteProp<RootStackParamList, 'FindMyAnimal'>>();
  const { ownerContacts } = route.params;

  const openOnMapsHandleClick = () => {
    openMap(mapRegion);
    const t = createMapLink(mapRegion);
    console.log(t);
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
            <View
              style={{
                flex: 0.7,
              }}
            >
              <MapView
                style={{
                  flex: 1,
                }}
                region={mapRegion}
                zoomControlEnabled={true}
                zoomTapEnabled={true}
              >
                <Marker coordinate={mapRegion} title="Marker" />
              </MapView>
            </View>

            <Button text={'Open on maps'} handleClick={openOnMapsHandleClick} />
          </>
        )}
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

export default FindMyAnimal;
