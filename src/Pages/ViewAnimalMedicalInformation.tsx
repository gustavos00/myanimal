import React, { useState } from 'react';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import DataElement from '../components/DataElement';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BackgroundFilter from '../components/BackgroundFilter';
import globalStyles from '../assets/styles/global';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../components/Button';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ViewAnimalMedicalInformationProps {}

function ViewAnimalMedicalInformation({}: ViewAnimalMedicalInformationProps) {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<boolean>();
  const [filter, setFilter] = useState<string>();

  const handleApplyFilter = () => {
    
  }

  return (
    <>
      <Header text={'Your pet is fine?'} />

      <Background>
        <>
          <BackgroundHeader text={'Medical information'}>
            <TouchableOpacity onPress={() => setFilterModalIsOpen(true)}>
              <Image source={require('../assets/img/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </BackgroundHeader>

          <DataElement
            photoUrl={require('../assets/img/doctor.png')}
            photoFlagType={'warning'}
            title={'Routine'}
            subTitle={'01/01/2000'}
            haveSlider={false}
          />
          <DataElement
            photoUrl={require('../assets/img/doctor.png')}
            photoFlagType={'done'}
            title={'Urgency'}
            subTitle={'01/01/2000'}
            haveSlider={false}
          />
          <DataElement
            photoUrl={require('../assets/img/doctor.png')}
            photoFlagType={'warning'}
            title={'Routine'}
            subTitle={'01/01/2000'}
            haveSlider={false}
          />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {filterModalIsOpen && (
        <>
          <BackgroundFilter>
            <View style={styles.searchModal}>
              <Text style={styles.header}>{'Please select a filter'}</Text>

              <View style={styles.pickerContainer}>
                <RNPickerSelect 
                  onValueChange={(value) => setFilter(value)}
                  items={[
                    { label: 'All', value: 'all' },
                    { label: 'Done', value: 'done' },
                    { label: 'Missing report', value: 'missingReport' },
                    { label: 'To be done', value: 'missingReport' },
                  ]}
                />
              </View>
              <Button text={'Apply filter'} handleClick={handleApplyFilter} />
            </View>
          </BackgroundFilter>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },

  searchIcon: {
    width: 20,
    height: 20,
  },

  searchModal: {
    width: 300,
    height: 200,
    padding: 0,

    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: globalStyles.white,
    borderRadius: 15,
  },

  pickerContainer: {
    width: 200,
    height: 50,
    padding: 5,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    backgroundColor: '#ccc'
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,

    color: globalStyles.black,
  },
});

export default ViewAnimalMedicalInformation;
