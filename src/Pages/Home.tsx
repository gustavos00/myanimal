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

const Home = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { haveAddress } = route.params;

  const { animalData } = useContext(UserContext);

  const [haveAddressState, setHaveAddressState] = useState(
    haveAddress as boolean
  );
  const [homePhrase, setHomePhrase] = useState<string>();

  useEffect(() => {
    if ((animalData && animalData.length == 0) || !haveAddress) {
      setHomePhrase('Something is missing...');
    } else {
      setHomePhrase('How is your pet?');
    }
  }, []);

  return (
    <>
      <>
        <Header text={homePhrase} />
        <HomeContentContainer
          animalData={animalData}
        />

        <Footer wichActive={'home'} />

        {!haveAddressState && (
          <>
            <BottomModal modalHeight={globalStyles.fullDeviceHeight / 1.5}>
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
