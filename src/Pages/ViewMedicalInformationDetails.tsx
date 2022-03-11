import React from 'react';
import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import EnableFindMyPetSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import StyledText from '../components/StyledText';

import { useRoute, RouteProp } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';
import BackgroundHeader from '../components/BackgroundHeader';

function ViewMedicalInformationDetails() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewMedicalInformationDetails'>>();
  const { medicalEventData } = route.params;

  const dateContent = medicalEventData.date.split('T');
  const date = dateContent[0].split('-').reverse().join('/');
  const time = dateContent[1].split(':');
  const eventDate = `${date} - ${time[0]}h${time[1]}m`;

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
              <StyledText
                value={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dolor quam, mattis sed quam a, varius porttitor leo. Etiam ac lectus eget urna ultricies dapibus blandit ac sem. Quisque erat sapien, accumsan eget sollicitudin ac, gravida non diam. Curabitur nunc ipsum, interdum eu lacinia quis, pharetra sit amet ipsum. Fusce tempor cursus enim at dignissim. Sed imperdiet, turpis at pharetra lobortis, orci lacus mattis ligula, ac rhoncus risus erat in enim. Quisque euismod venenatis porta. Etiam quis leo magna.'
                }
                text={'Report'}
                hasScroll
              />
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
