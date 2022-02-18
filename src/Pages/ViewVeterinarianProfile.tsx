import React from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/core';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';

import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import StyledText from '../components/StyledText';


function ViewVeterinarianProfile() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewVeterinarianProfile'>>();
  const { veterinarianData, isUserAnimalVeterinarian } = route.params;

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.headerBg}>
        <ProfilePhoto photoUrl={veterinarianData.photoUrl} />

        <Background heightSize={'75%'}>
          <Scroll aligned>
            <View style={styles.inputsContainer}>
              <StyledText value={veterinarianData.givenName} text={'Name'} />
              <StyledText value={veterinarianData.givenName} text={'Street'} />
              <StyledText value={veterinarianData.givenName} text={'City'} />
              <StyledText value={veterinarianData.givenName} text={'Locality'} />

              {isUserAnimalVeterinarian && (
                <>
                  <Button text={'Send message'} handleClick={() => console.log('test')} />
                  <Button text={'View saved files'} handleClick={() => console.log('test')} />
                  <Button text={'Remove vet'} handleClick={() => console.log('test')} />
                  <Button text={'Choose another one'} handleClick={() => navigation.navigate('Veterinarians' as never)} />
                </>
              )}
            </View>
          </Scroll>
        </Background>
      </View>

      <Footer wichActive={'home'} />
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,

    justifyContent: 'center',

    backgroundColor: globalStyles.mainColor,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 40,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewVeterinarianProfile;

