import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import Header from '../components/Header';
import Background from '../components/Background';
import NoAnimalAlert from '../components/NoAnimalAlert';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import AuthContext from '../contexts/user';
import GeneralAnimalElements from '../components/GeneralAnimalElements';
import BottomModal from '../components/BottomModal';
import CreateAddress from '../components/CreateAddress';

import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import Button from '../components/Button';

const Home = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { haveAddress } = route.params;

  const { user, pushAnimalData, animalData } = useContext(AuthContext);

  const [haveAddressState, setHaveAddressState] = useState(
    haveAddress as boolean
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [homePhrase, setHomePhrase] = useState<string>();
  const [localAnimalData, setLocalAnimalData] =
    useState<Array<AnimalInfoParams> | void>(animalData);

  useEffect(() => {
    if ((animalData && animalData.length == 0) || !haveAddress) {
      setHomePhrase('Is missing something...');
    } else {
      setHomePhrase("How it's your animal?");
    }
  }, []);

  const ob = {
    age: 'string',
    birthday: 'string',
    birthdayMonth: 'string',
    breed: 'string',
    idAnimal: 1,
    imageName: 'string',
    imageUrl: 'string',
    name: 'string',
    trackNumber: 'string',
    userIdUser: 1,
  };

  return (
    <>
      <>
        <Header text={homePhrase} />
        <Background>
          {animalData?.length === 0 ? (
            <>
              <NoAnimalAlert />
            </>
          ) : (
            <>
              <BackgroundHeader isEditing={isEditing} text={'Your animals'} />
              <ScrollView>
                <GeneralAnimalElements
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  animalData={animalData}
                />
              </ScrollView>
            </>
          )}
        </Background>

        <Footer wichActive={'home'} />

        {!haveAddressState && (
          <>
            <BottomModal modalHeight={450}>
              <CreateAddress
                changeHaveAddressStateFunction={setHaveAddressState}
              />
            </BottomModal>
          </>
        )}
      </>
    </>
  );
};

export default Home;
