import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';

import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import EnableFindMyPetSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import StyledText from '../components/StyledText';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import SetAnimalVeterinarian from '../components/SetAnimalVeterinarian';

function ViewAnimal() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewAnimal'>>();
  const { animalInfo } = route.params;

  return (
    <>
      <View style={styles.headerBg}>
        <ProfilePhoto photoUrl={animalInfo.photoUrl} />

        <Background heightSize={'75%'}>
          <Scroll aligned>
            <View style={styles.inputsContainer}>
              <StyledText value={animalInfo.name} text={'Name'} />
              <StyledText value={animalInfo.age} text={'Age'} />
              <StyledText value={animalInfo.breed} text={'Breed'} />
              <StyledText value={animalInfo.birthday} text={'Birthday'} />
              <StyledText value={animalInfo.birthdayMonth} text={'Birthday month'} />
              <StyledText value={animalInfo.trackNumber} text={'Track number'} />

              <EnableFindMyPetSwitch enableValue={false} />
            </View>
            <SetAnimalVeterinarian data={animalInfo.userVeterinarianFk} animalData={animalInfo} />
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

export default ViewAnimal;
