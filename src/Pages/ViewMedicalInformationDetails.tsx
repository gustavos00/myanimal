import React from 'react';
import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import EnableFindMyPetSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import StyledText from '../components/StyledText';

import { useRoute, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';
import BackgroundHeader from '../components/BackgroundHeader';

function ViewMedicalInformationDetails() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewMedicalInformationDetails'>>();
  const { medicalEventData } = route.params;

  const splitedDate = new Date(medicalEventData.date)
  .toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '')
  .split(' ')

  const date = splitedDate[0].split('-').reverse().join('/')
  const splitedTime = splitedDate[1].split(':')
  const fullTime = splitedTime[0] + ':' + splitedTime[1]
  const eventDate = `${date} ${fullTime}`
  
  return (
    <>
      <View style={styles.headerBg}>
        <ProfilePhoto photoUrl={'animalInfo.photoUrl'} />

        <Background heightSize={'75%'}>
          <Scroll aligned>
            <View style={styles.inputsContainer}>
              <StyledText value={eventDate} text={'Date'} />
              <StyledText value={medicalEventData.eventsStatus.value} text={'Status'} />
              <StyledText value={medicalEventData.eventsType.value} text={'Type'} />
              <StyledText value={medicalEventData.report} text={'Report'} hasScroll />
            </View>

            <View style={styles.filesContainer}>
              <BackgroundHeader text={'Related documents'} />
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

  filesContainer: { width: '100%', marginTop: 20 },
});

export default ViewMedicalInformationDetails;
