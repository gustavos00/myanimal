import React, { ReactNode, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';
import { showError } from '../utils/error';
import { generateFormData } from '../utils/FormData';
import { generateUrlSearchParams } from '../utils/URLSearchParams';
import { VeterinarianData } from '../types/VeterinarianData';

import api from '../api/api';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import DataElement from '../components/DataElement';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import StatesContext from '../contexts/states';
import VeterinariansContext from '../contexts/veterinarians';
import Scroll from '../components/Scroll';

function Veterinarians() {
  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { veterinarians, updateAnimalVeterinarian } = useContext(VeterinariansContext);

  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, 'Veterinarians'>>();
  const { idAnimal } = route.params;

  const handleSelectVeterinarian = async (veterinarian: VeterinarianData) => {
    if (!idAnimal)
      return showError(
        'Cant get animal id on handleSelectVeterinarian funtion',
        'Apparently there was an error, try again'
      );
    try {
      setIsLoading(true);

      const tempObj = {
        veterinarianId: veterinarian.idUser,
        animalId: idAnimal,
      };
      const veterinarianUpdateData = generateUrlSearchParams(tempObj);

      const response = await api.post(`/veterinarian/accept`, veterinarianUpdateData);
      const data: any = response.data;
      setIsLoading(false);

      const animalInfo = updateAnimalVeterinarian(
        veterinarian,
        idAnimal,
        data.veterinarianFingerprint
      );
      navigation.navigate('ViewAnimal' as never, { animalInfo } as never);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  return (
    <>
      <Header text={'Make the right choice!'} />

      <Background>
        <>
          <BackgroundHeader text={'Veterinarians'} />

          <Scroll>
            {veterinarians?.map((item, index) => (
              <DataElement
                key={index}
                haveSlider
                photoUrl={item.photoUrl}
                title={item.givenName}
                subTitle={item.familyName}
                sliderFalseColor={'green'}
                sliderTrueText={'More info'}
                sliderFalseText={'Select'}
                sliderFalseFunction={() => handleSelectVeterinarian(item)}
                sliderTrueFunction={() =>
                  navigation.navigate(
                    'ViewVeterinarianProfile' as never,
                    { veterinarianData: item } as never
                  )
                }
              />
            ))}
          </Scroll>
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {isLoading && <Loading />}
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
});

export default Veterinarians;
