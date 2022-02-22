import React, { useContext } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/core';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';
import { showError } from '../utils/error';

import api from '../api/api';
import globalStyles from '../assets/styles/global';
import Background from '../components/Background';
import Footer from '../components/Footer';
import ProfilePhoto from '../components/ProfilePhoto';
import Scroll from '../components/Scroll';
import StyledText from '../components/StyledText';
import SmallButton from '../components/SmallButton';
import StatesContext from '../contexts/states';
import Loading from '../components/Loading';
import { generateUrlSearchParams } from '../utils/URLSearchParams';

function ViewVeterinarianProfile() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewVeterinarianProfile'>>();
  const { veterinarianData, isUserAnimalVeterinarian, idAnimal } = route.params;

  const { isLoading, setIsLoading } = useContext(StatesContext);

  const navigation = useNavigation();

  // TO DO -> Show correct information

  const handleRemoveVeterinarian = async () => {
    try {
      setIsLoading(true);

      console.log(idAnimal);
      const tempObj = { animalId: idAnimal };
      const veterinarianUpdateData = generateUrlSearchParams(tempObj);

      await api.post('/veterinarian/remove', veterinarianUpdateData);
      setIsLoading(false);

      //to do -> update local

      navigation.goBack()
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <ProfilePhoto photoUrl={veterinarianData.photoUrl} />

        <Background heightSize={'75%'}>
          <Scroll aligned>
            <View style={styles.inputsContainer}>
              <StyledText value={veterinarianData.givenName} text={'Name'} />
              <StyledText value={veterinarianData.givenName} text={'Street'} />
              <StyledText value={veterinarianData.givenName} text={'City'} />
              <StyledText value={veterinarianData.givenName} text={'Locality'} />

              {isUserAnimalVeterinarian && (
                <View style={styles.buttonContainer}>
                  <SmallButton
                    borderColor={'#D44956'}
                    textColor={'#D44956'}
                    handleClick={handleRemoveVeterinarian}
                    text={'Remove'}
                  />
                  <SmallButton
                    textColor={'#fff'}
                    backgroundColor={'#5399DA'}
                    handleClick={() =>
                      navigation.navigate('Veterinarians' as never, { idAnimal } as never)
                    }
                    text={'Change'}
                  />
                </View>
              )}
            </View>
          </Scroll>
        </Background>
      </View>

      <Footer wichActive={'home'} />

      {isLoading && <Loading />}
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

  buttonContainer: {
    marginTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ViewVeterinarianProfile;
