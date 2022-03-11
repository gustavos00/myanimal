import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';
import { showError } from '../utils/error';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from '../contexts/user';
import BottomModal from '../components/BottomModal';
import CreateAddress from '../components/CreateAddress';
import HomeContentContainer from '../components/HomeContentContainer';
import globalStyles from '../assets/styles/global';
import BackgroundFilter from '../components/BackgroundFilter';
import StatesContext from '../contexts/states';
import Modal from '../components/Modal';
import api from '../api/api';
import GestureRecognizer from 'react-native-swipe-gestures';

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
    if (!deleteAnimalModalData) {
      setDeleteAnimalModalData(undefined);
      return showError(
        'user want delete a animal that doesnt exist',
        'Apparently there was an error deleting this animal, try again'
      );
    }

    const { idAnimal, arrayKey } = deleteAnimalModalData;
    try {
      await api.delete(`/animal/delete/${String(idAnimal)}`);
      deleteAnimalData(arrayKey);
      setDeleteAnimalModalData(undefined);
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error deleting this animal, try again'
      );
    }
  };

  const handleCloseBottomModal = () => {
    setHaveAddressState(true);
  };

  return (
    <>
      <>
        <Header text={homePhrase} />
        <HomeContentContainer animalData={animalData} />

        <Footer wichActive={'home'} />

        {!haveAddressState && (
          <>
            <BottomModal
              swipeDownFunction={handleCloseBottomModal}
              modalHeight={globalStyles.fullDeviceHeight / 1.5}
            >
              <CreateAddress changeHaveAddressStateFunction={setHaveAddressState} />
            </BottomModal>
          </>
        )}

        {!!deleteAnimalModalData && (
          <BackgroundFilter handlePress={handleCloseDeleteAnimalModal}>
            <Modal
              title={'Uhm, are you sure?'}
              text={'Are you sure you will permanently delete an animal?'}
              noButtonText={'Nevermind'}
              yesButtonText={'Delete'}
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
