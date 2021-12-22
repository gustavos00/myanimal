import React, { useContext, useState } from 'react';
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

const Home = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { haveAddress } = route.params;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  let homePhrase;

  if (!haveAddress || (user?.animalData && user?.animalData.length == 0)) {
    homePhrase = 'Is missing something...';
  } else {
    homePhrase = "How it's your animal?";
  }
  return (
    <>
      <Header text={homePhrase} name={user?.givenName} image={user?.imageUrl} />

      <Background>
        {user?.animalData.length === 0 ? (
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
                animalData={user?.animalData}
              />
            </ScrollView>
          </>
        )}
      </Background>

      <Footer wichActive={'home'} />

      {!haveAddress && (
        <>
          <BottomModal modalHeight={350}>
            <></>
          </BottomModal>
        </>
      )}
    </>
  );
};

export default Home;
