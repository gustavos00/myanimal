import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from '../contexts/user';
import BottomModal from '../components/BottomModal';
import CreateAddress from '../components/CreateAddress';
import HomeContentContainer from '../components/HomeContentContainer';
import globalStyles from '../assets/styles/global';
import BackgroundFilter from '../components/BackgroundFilter';
import StatesContext from '../contexts/states';
import ConfirmDeleteAnimalModal from '../components/ConfirmDeleteAnimalModal';
import api from '../api/api';

const Home = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { haveAddress } = route.params;

  const { animalData } = useContext(UserContext);
  const { deleteAnimalModalData, setDeleteAnimalModalData } = useContext(StatesContext);
  const { deleteAnimalData } = useContext(UserContext);

  const [haveAddressState, setHaveAddressState] = useState(haveAddress as boolean);
  const [homePhrase, setHomePhrase] = useState<string>();

  useEffect(() => {
    if ((animalData && animalData.length == 0) || !haveAddress) {
      setHomePhrase('Something is missing...');
    } else {
      setHomePhrase('How is your pet?');
    }
  }, []);

  const handleCloseDeleteAnimalModal = () => {
    setDeleteAnimalModalData(undefined);
  };

  const handleDeleteAnimal = async () => {
    if(!deleteAnimalModalData) {
      return console.log('dont exist')
    };

    const {idAnimal, arrayKey} = deleteAnimalModalData 
    try {
      await api.delete(`/animal/delete/${String(idAnimal)}`);
      deleteAnimalData(arrayKey);
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error deleting this animal, try again'
      );
    }
  };

  return (
    <>
      <>
        <Header text={homePhrase} />
        <HomeContentContainer animalData={animalData} />

        <Footer wichActive={'home'} />

        {!haveAddressState && (
          <>
            <BottomModal modalHeight={globalStyles.fullDeviceHeight / 1.5}>
              <CreateAddress changeHaveAddressStateFunction={setHaveAddressState} />
            </BottomModal>
          </>
        )}

        {!!deleteAnimalModalData && (
          <BackgroundFilter handlePress={handleCloseDeleteAnimalModal}>
            <ConfirmDeleteAnimalModal
              trueFunction={handleDeleteAnimal}
              falseFunction={handleCloseDeleteAnimalModal}
            />
          </BackgroundFilter>
        )}
      </>
    </>
  );
};

export default Home;
function deleteAnimalData(arrayKey: number) {
  throw new Error('Function not implemented.');
}

function showError(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}
