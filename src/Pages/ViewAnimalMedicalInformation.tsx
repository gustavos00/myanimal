import React, { useEffect, useMemo, useState } from 'react';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import DataElement from '../components/DataElement';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BackgroundFilter from '../components/BackgroundFilter';
import globalStyles from '../assets/styles/global';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../components/Button';
import api from '../api/api';

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ViewAnimalMedicalInformationProps {}

function ViewAnimalMedicalInformation({}: ViewAnimalMedicalInformationProps) {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<boolean>();
  const [filter, setFilter] = useState<string>();
  const [events, setEvents] = useState<any>();
  const [filteredEvents, setFilteredEvents] = useState<any>();

  useEffect(() => {
    const handleGetEvents = async () => {
      try {
        const response = await api.get(`animal/medicalEvents/?id=1`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    handleGetEvents();
  }, []);

  const handleApplyFilter = () => {
    if (filter === 'all') {
      setFilteredEvents(events);
      setFilterModalIsOpen(false);
      return;
    }
    const localFilteredEvents = events.filter((e: any) => e.eventsStatus.label === filter);
    setFilteredEvents(localFilteredEvents);
    setFilterModalIsOpen(false);
  };

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

          <FlatList
            data={filteredEvents}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const dateContent = item.date.split('T');
              const date = dateContent[0].split('-').reverse().join('/');
              const time = dateContent[1].split(':');
              const eventDate = `${date} - ${time[0]}h${time[1]}m`;

              return (
                <DataElement
                  photoUrl={require('../assets/img/doctor.png')}
                  photoFlagType={item.eventsStatus.label}
                  title={item.eventsType.value}
                  subTitle={eventDate}
                  haveSlider={false}
                />
              );
            }}
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
                    //To do -> should be dynamic?
                    { label: 'All', value: 'all' },
                    { label: 'Soon', value: 'soon' },
                    { label: 'Missing report', value: 'missingReport' },
                    { label: 'Already done', value: 'alreadyDone' },
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
    backgroundColor: '#ccc',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,

    color: globalStyles.black,
  },
});

export default ViewAnimalMedicalInformation;
