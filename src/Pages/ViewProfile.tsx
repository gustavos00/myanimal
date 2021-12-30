import React, { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import globalStyles from '../assets/styles/global';

import Background from '../components/Background';
import BottomModal from '../components/BottomModal';
import Button from '../components/Button';
import Footer from '../components/Footer';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import OptionHeader from '../components/OptionHeader';
import ProfileImage from '../components/ProfileImage';
import StyledInput from '../components/StyledInput';
import StyledText from '../components/StyledText';
import Underline from '../components/Underline';

import AuthContext from '../contexts/user';

function ViewProfile() {
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [newStatusPhrase, setNewStatusPhrase] = useState<string>();

  const { user } = useContext(AuthContext);

  const handleStatusText = (e: string) => {
    //Sanitize string
    setNewStatusPhrase(e);
  };

  const handleUpdateStatusButton = () => {
    //API Request
  };

  return (
    <>
      <View style={styles.headerBg}>
        <ProfileImage photoUrl={user?.imageUrl} />

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.firstInputContainer}>
                <OptionHeader text={'Account information'} />
                <StyledText value={user?.givenName ?? ''} text={'Given Name'} />
                <StyledText
                  value={user?.familyName ?? ''}
                  text={'Family Name'}
                />
                <StyledText value={user?.email ?? ''} text={'Email'} />
                <StyledText
                  value={user?.phoneNumber ?? ''}
                  text={'Phone number'}
                />
              </View>

              <Underline />
              <View style={styles.inputsContainer}>
                <OptionHeader text={'Address information'} />
                <StyledText
                  value={user?.userAddress.streetName ?? ''}
                  text={'Street name'}
                />
                <StyledText
                  value={user?.userAddress.doorNumber ?? ''}
                  text={'Door number'}
                />
                <StyledText
                  value={user?.userAddress.postalCode ?? ''}
                  text={'Postal code'}
                />
              </View>
            </View>
          </KeyboardAvoidingWrapper>
        </Background>
      </View>

      <Footer wichActive={'user'} />

      {statusModalIsOpen && (
        <BottomModal
          modalHeight={250}
          swipeDownFunction={() => setStatusModalIsOpen(false)}
        >
          <StyledInput
            text={newStatusPhrase}
            placeholder={'Update status'}
            handleChangeFunction={handleStatusText}
          />
          <Button
            text={'Update Status'}
            handleClick={handleUpdateStatusButton}
          />
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

  firstInputContainer: {
    width: '80%',
    marginTop: 40,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 20,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewProfile;
