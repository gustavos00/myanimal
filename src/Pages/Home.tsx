import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthContext from '../contexts/user';
import BottomModal from '../components/BottomModal';
import CreateAddress from '../components/CreateAddress';
import HomeContentContainer from '../components/HomeContentContainer';

const Home = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { haveAddress } = route.params;

  const { animalData } = useContext(AuthContext);

  const [haveAddressState, setHaveAddressState] = useState(
    haveAddress as boolean
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [homePhrase, setHomePhrase] = useState<string>();

  useEffect(() => {
    if ((animalData && animalData.length == 0) || !haveAddress) {
      setHomePhrase('Something is missing...');
    } else {
      setHomePhrase('How is your animal?');
    }
  }, []);

  return (
    <>
      <>
        <Header text={homePhrase} />
        <HomeContentContainer
          animalData={animalData}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />

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
