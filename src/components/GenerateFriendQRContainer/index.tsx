import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import api from '../../api/api';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../../assets/styles/global';
import BottomModal from '../BottomModal';
import { showError } from '../../utils/error';
import Loading from '../Loading';

interface userDataProps {
  email?: string,
  id?: number 
}

interface GenerateFriendQrContainerProps {
  closeBottomModalFunction: (e: boolean) => void;
  userData: userDataProps;
}

function GenerateFriendQrContainer({
  closeBottomModalFunction,
  userData,
}: GenerateFriendQrContainerProps) {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState<boolean>();

  if(!userData.email) return <></>;

  const generateQR = async () => {
    if(!userData) return console.log('error getting user data');
    try {
      setLoading(true)
      const response = await api.get(`user/friend/token?email=${userData.email}&id=${userData.id}`);
      setLoading(false)

      const { token } = response.data
      setToken(token)
    } catch (e) {
      setLoading(false)
      showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  useEffect(() => {
    const generateQRuseEffectFunction = async () => {
      setLoading(true)
      await generateQR()
    }

    generateQRuseEffectFunction()
  }, [])

  return (
    <>
      <BottomModal
        swipeDownFunction={() => closeBottomModalFunction(false)}
        modalHeight={350}
      >
        <>
          <Text style={styles.qrHeaderText}>
            Share this QR to receive a friend request!
          </Text>
          <View style={styles.qrContainer}>
            <QRCode
              value={token}
              size={200}
            />
          </View>
        </>
      </BottomModal>

      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  qrHeaderText: {
    marginBottom: 30,

    opacity: 0.9,
    fontSize: 18,
    color: globalStyles.black,
  },
});

export default GenerateFriendQrContainer;
