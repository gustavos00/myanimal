import React, { useEffect, useState } from 'react';
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
import { AnimalMedicalEvents } from '../types/AnimalMedicalEvents';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

function ViewAnimalMedicalInformation() {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<boolean>();
  const [filter, setFilter] = useState<string>();
  const [events, setEvents] = useState<Array<AnimalMedicalEvents>>([]);
  const [filteredEvents, setFilteredEvents] = useState<Array<AnimalMedicalEvents>>([]);

  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, 'ViewAnimalMedicalInformation'>>();
  const { idAnimal } = route.params;

  useEffect(() => {
    //to do -> try useMemo
    const handleGetEvents = async () => {
      try {
        const response = await api.get(`animal/medicalEvents/?id=${idAnimal}`);
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
            renderItem={({ item }) => {
              const splitedDate = new Date(item.date)
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, '')
                .split(' ');

              const date = splitedDate[0].split('-').reverse().join('/');
              const splitedTime = splitedDate[1].split(':');
              const fullTime = splitedTime[0] + ':' + splitedTime[1];
              const eventDate = `${date} ${fullTime}`;

              return (
                <DataElement
                  handleOnPress={() =>
                    navigation.navigate(
                      'ViewMedicalInformationDetails' as never,
                      { medicalEventData: item } as never
                    )
                  }
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
                  placeholder={{ label: 'Please, select a filter', value: 'pleaseSelectAFilter' }}
                  onValueChange={(value) => setFilter(value)}
                  items={[
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
