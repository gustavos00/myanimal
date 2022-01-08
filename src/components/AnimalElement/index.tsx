import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import api from '../../api/api';
import globalStyles from '../../assets/styles/global';

import { showError } from '../../utils/error';
import { AnimalInfoParams } from '../../interfaces/AnimalInfoParams';
import UserContext from '../../contexts/user';
import ActionsElements from '../ActionsElements';

interface AnimalElementProps {
  animalData: AnimalInfoParams;
}

function AnimalElement({ animalData }: AnimalElementProps) {
  const navigation = useNavigation();
  const { deleteAnimalData } = useContext(UserContext);

  const deletingAnimal = async (id: number, arrayKey: number) => {
    try {
      await api.delete(`/animal/delete/${String(id)}`);
      deleteAnimalData(arrayKey);
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error deleting this animal, try again'
      );
    }
  };

  const updatingAnimal = () => {
    navigation.navigate(
      'UpdateAnimal' as never,
      {
        animalInfo: animalData,
      } as never
    );
  };

  const viewingAnimal = (item: Object) => {
    navigation.navigate(
      'ViewAnimal' as never,
      {
        animalInfo: item,
      } as never
    );
  };

  return (
    <>
      <View style={styles.element}>
        <ScrollView horizontal style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              viewingAnimal(animalData);
            }}
          >
            <View style={styles.contentContainer}>
              <Image
                source={{ uri: animalData.photoUrl }}
                style={styles.icon}
              />

              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{animalData.name}</Text>
                <Text style={styles.breedText}>{animalData.breed}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <ActionsElements
            trueText={'Edit'}
            falseText={'Delete'}
            trueColor={'blue'}
            trueFunction={updatingAnimal}
            falseFunction={() => {
              deletingAnimal(animalData.idAnimal, animalData.arrayKey);
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
  },

  contentContainer: {
    width: globalStyles.fullDeviceWidth,
    padding: globalStyles.smallGap,

    flexDirection: 'row',
  },

  element: {
    margin: globalStyles.smallGap,

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

  icon: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').width * 0.22,
    borderRadius: globalStyles.smallGap,

    backgroundColor: 'red',
  },

  textContainer: {
    marginLeft: globalStyles.smallGap,
    marginTop: globalStyles.smallGap,
  },

  nameText: {
    color: globalStyles.black,
    fontSize: 18,
    fontWeight: 'bold',
  },

  breedText: {
    fontSize: 16,
    color: globalStyles.darkGray,
  },
});

export default AnimalElement;
