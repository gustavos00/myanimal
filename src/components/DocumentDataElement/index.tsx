import React from 'react';
import globalStyles from '../../assets/styles/global';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimalMedicalEventsFiles } from '../../types/AnimalMedicalEvents';
import ThreeDotsSvg from '../../assets/img/threeDots.svg';

interface DocumentDataElementProps {
  medicalEventFileData: AnimalMedicalEventsFiles;
  setModalIsOpen: (date: AnimalMedicalEventsFiles) => void;
}

function DocumentDataElement({ medicalEventFileData, setModalIsOpen }: DocumentDataElementProps) {
  return (
    <>
      <View style={styles.element}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>{medicalEventFileData.label}</Text>
            <Text style={styles.secondText}>{medicalEventFileData.function}</Text>
          </View>

          <TouchableOpacity
            style={styles.dotCircleButton}
            onPress={() => setModalIsOpen(medicalEventFileData)}
            activeOpacity={0.7}
          >
            <ThreeDotsSvg color={'#fff'} width={20} height={20} style={{transform: [{ rotate: '90deg'}]}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  element: {
    height: 105 + globalStyles.smallerGap / 2,
    marginTop: globalStyles.smallerGap,
    margin: 10,

    backgroundColor: 'white',
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,

    elevation: 4,
  },

  contentContainer: {
    padding: globalStyles.smallerGap,
    marginTop: globalStyles.smallerGap,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {
    width: (globalStyles.fullDeviceWidth - globalStyles.smallerGap) * 0.8,
  },

  mainText: {
    color: globalStyles.black,
    fontSize: 18,
    fontWeight: 'bold',
  },

  secondText: {
    fontSize: 16,
    color: globalStyles.darkGray,
  },

  dotCircleButton: {
    width: 30,
    height: 30,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: globalStyles.mainColor,
  },
});

export default DocumentDataElement;
