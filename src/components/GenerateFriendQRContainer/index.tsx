import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import api from '../../api/api';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../../assets/styles/global';
import BottomModal from '../BottomModal';
import { showError } from '../../utils/error';

interface GenerateFriendQrContainerProps {
  closeBottomModalFunction: (e: boolean) => void;
  email: string;
}

function GenerateFriendQrContainer({
  closeBottomModalFunction,
  email,
}: GenerateFriendQrContainerProps) {
  const [token, setToken] = useState();

  if(!email) return <></>;

  const generateQR = async () => {
    try {
      const response = await api.get(`user/friend/token?email=${email}`);

      const { token } = response.data
      setToken(token)
    } catch (e) {
      showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  useEffect(() => {
    const generateQRuseEffectFunction = async () => {
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