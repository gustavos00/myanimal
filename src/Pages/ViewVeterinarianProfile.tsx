import React, { useContext } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/core';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';
import { showError } from '../utils/error';
import { generateUrlSearchParams } from '../utils/URLSearchParams';

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
import VeterinariansContext from '../contexts/veterinarians';

function ViewVeterinarianProfile() {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewVeterinarianProfile'>>();
  const { veterinarianData, isUserAnimalVeterinarian, idAnimal, veterinarianAcceptedRequest } = route.params;

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { deleteAnimalVeterinarian } = useContext(VeterinariansContext);

  const navigation = useNavigation();

  const handleRemoveVeterinarian = async () => {
    try {
      setIsLoading(true);

      const tempObj = { animalId: idAnimal };
      const veterinarianUpdateData = generateUrlSearchParams(tempObj);

      await api.post('/veterinarian/remove', veterinarianUpdateData);
      setIsLoading(false);

      const animalInfo = deleteAnimalVeterinarian(idAnimal);
      navigation.navigate('ViewAnimal' as never, { animalInfo } as never);
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
              <StyledText
                value={`${veterinarianData.givenName} ${veterinarianData.familyName}`}
                text={'Name'}
              />
              <StyledText value={veterinarianData.veterinarianAddress.streetName} text={'Street'} />
              <StyledText value={veterinarianData.veterinarianAddress.parishName} text={'City'} />
              <StyledText
                value={veterinarianData.veterinarianAddress.locationName}
                text={'Locality'}
              />
              <StyledText value={veterinarianAcceptedRequest ? 'Accepted' : 'Waiting'} text={'Status'} />

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
