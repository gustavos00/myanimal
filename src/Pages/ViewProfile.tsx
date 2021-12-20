import React, { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import globalStyles from '../assets/styles/global';

import Background from '../components/Background';
import BottomModal from '../components/BottomModal';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ProfileImage from '../components/ProfileImage';
import StyledInput from '../components/StyledInput';
import StyledText from '../components/StyledText';

import AuthContext from '../contexts/user';

function ViewProfile() {
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(true);
  const [newStatusPhrase, setNewStatusPhrase] = useState<string>();

  const { user } = useContext(AuthContext);

  const handleStatusText = (e: string) => {
    //Sanitize string
    setNewStatusPhrase(e)
  }

  const handleUpdateStatusButton = () => {
    //API Request
  }

  return (
    <>
      <View style={styles.headerBg}>
        <ProfileImage statusMessage={''} photoUrl={user?.imageUrl} />

        <Background heightSize={'75%'}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputsContainer}>
              <StyledText value={user?.givenName ?? ''} text={'Given Name'} />
              <StyledText value={user?.familyName ?? ''} text={'Family Name'} />
              <StyledText value={user?.email ?? ''} text={'Email'} />
            </View>
          </ScrollView>
        </Background>
      </View>

      <Footer wichActive={'user'} />

      {statusModalIsOpen && (
        <BottomModal modalHeight={250} swipeDownFunction={() => setStatusModalIsOpen(false)}>
          <StyledInput text={newStatusPhrase} placeholder={'Update status'} handleChangeFunction={handleStatusText} />
          <Button text={'Update Status'} handleClick={handleUpdateStatusButton}/>
        </BottomModal>
      )}
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
});

export default ViewProfile;
