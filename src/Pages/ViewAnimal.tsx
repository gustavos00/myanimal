import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';

import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import EnableFindMyPetSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import StyledText from '../components/StyledText';
import ProfileImage from '../components/ProfileImage';

function CreateOrUpdateAnimal() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewAnimal'>>();
  const { animalInfo } = route.params;

  return (
    <>
      <View style={styles.headerBg}>
        <ProfileImage photoUrl={animalInfo.photourl} />

        <Background heightSize={'75%'}>
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <StyledText value={animalInfo.name} text={'Full Name'} />
              <StyledText value={animalInfo.age} text={'Age'} />
              <StyledText value={animalInfo.race} text={'Race'} />
              <StyledText value={animalInfo.chipnumber} text={'Chip Number'} />
            </View>

            <EnableFindMyPetSwitch enableValue={false} />
          </View>
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

export default CreateOrUpdateAnimal;
