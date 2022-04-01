import React, { useState } from 'react';
import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import Footer from '../components/Footer';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import StyledText from '../components/StyledText';
import BackgroundHeader from '../components/BackgroundHeader';
import DocumentDataElement from '../components/DocumentDataElement';
import BottomModal from '../components/BottomModal';

import { useRoute, RouteProp } from '@react-navigation/native';
import { View, StyleSheet, Linking } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';
import { AnimalMedicalEventsFiles } from '../types/AnimalMedicalEvents';
import { formatDate } from '../utils/date';
import Button from '../components/Button';
import { showError } from '../utils/error';

function ViewMedicalInformationDetails() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewMedicalInformationDetails'>>();
  const { medicalEventData } = route.params;

  const [modalData, setModalData] = useState<AnimalMedicalEventsFiles>();

  const eventDate = formatDate(medicalEventData.date);

  const handleDownloadClick = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      showError('This link is not supported', 'Sorry, appears this link is not supported');
    }
  };

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

              {medicalEventData.files.map((item, index) => (
                <DocumentDataElement
                  key={index}
                  setModalIsOpen={setModalData}
                  medicalEventFileData={item}
                />
              ))}
            </View>
          </Scroll>
        </Background>
      </View>

      <Footer wichActive={'home'} />

      {!!modalData && (
        <BottomModal swipeDownFunction={() => setModalData(undefined)} modalHeight={430}>
          <View style={styles.textContainer}>
            <StyledText text={'Name'} value={modalData.label} />
            <StyledText text={'Details'} value={modalData.function} hasScroll />
            <StyledText text={'Date'} value={formatDate(modalData.updatedAt)} />

            <Button handleClick={() => handleDownloadClick(modalData.file)} text={'Download'} />
          </View>
        </BottomModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fileContainer: {
    marginBottom: 10,
  },
  headerBg: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: globalStyles.mainColor,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 40,
  },

  textContainer: {
    width: globalStyles.almostTheFullDeviceWidth,
  },

  filesContainer: { width: '100%', marginTop: 20 },
});

export default ViewMedicalInformationDetails;
