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
import { AnimalDataWithArraykey } from '../../types/AnimalData';
import UserContext from '../../contexts/user';
import ActionsElements from '../ActionsElements';
import StatesContext from '../../contexts/states';



interface AnimalElementProps {
  animalData: AnimalDataWithArraykey;
}

function AnimalElement({ animalData }: AnimalElementProps) {
  const navigation = useNavigation();

  const { setDeleteAnimalModalData } = useContext(StatesContext);

  const handleDeleteAnimal = () => {
    setDeleteAnimalModalData(animalData);
  };

  const handleUpdateAnimal = () => {
    navigation.navigate(
      'UpdateAnimal' as never,
      {
        animalInfo: animalData,
      } as never
    );
  };

  const handleViewAnimal = (item: Object) => {
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ alignItems: 'center' }}
          style={styles.container}
        >
          <TouchableOpacity
            onPress={() => {
              handleViewAnimal(animalData);
            }}
            style={{ marginLeft: (globalStyles.almostTheFullDeviceWidth / 2) * 0.15 }}
          >
            <View style={styles.contentContainer}>
              <Image source={{ uri: animalData.photoUrl }} style={styles.icon} />

              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{animalData.name}</Text>
                <Text style={styles.breedText}>{animalData.breed}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <ActionsElements
            trueText={'Edit'}
            falseText={'Delete'}
            trueFunction={handleUpdateAnimal}
            falseFunction={handleDeleteAnimal}
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

    flexDirection: 'row',
  },

  element: {
    backgroundColor: 'white',
    borderRadius: 15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: globalStyles.fullDeviceHeight * 0.13,

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
    borderRadius: globalStyles.smallerGap,
  },

  textContainer: {
    marginLeft: globalStyles.smallerGap,
    marginTop: globalStyles.smallerGap,
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
