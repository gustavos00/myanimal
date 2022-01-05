import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core';
import { showError } from '../utils/error';

import api from '../api/api';

import Header from '../components/Header';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';
import AuthContext from '../contexts/user';

interface HandleScanCode {
  type: string;
  data: string;
}

function ScanQr() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted' ? true : false);
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  /* RE-REQUEST IF DONT HAVE CAMERA PERMS
  Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={'Allow Camera'}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }*/

  // What happens when we scan the bar code
  const handleQRCodeScanned = async ({ type, data }: HandleScanCode) => {
    setScanned(true);

    if (type === 'org.iso.QRCode') {
      setMessage('QR Readed');

      try {
        await api.get(
          `user/friend/verifyToken?token=${data}&fromWho=${user?.id}`
        );

        Alert.alert('Your friend request has made with success');
        navigation.navigate(
          'Home' as never,
          { isValid: true, haveAddress: true } as never
        );
      } catch (e: any) {
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    } else {
      setMessage('Please, read a valid QR code.');
    }
  };

  const enableReScan = () => {
    setScanned(false);
    setMessage(undefined);
  };

  return (
    <>
      <Header text={'New friends, hm?'} />
      <Background>
        <>
          <BackgroundHeader text={'Scan Friend QR Code'} />

          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
              style={styles.qrCodeBox}
            />

            {message && (
              <>
                <Text style={styles.messageText}>{message}</Text>

                <Button handleClick={enableReScan} text={'Re-scan'} />
              </>
            )}
          </View>

          <Footer wichActive={'settings'} />
        </>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,

    alignItems: 'center',
  },

  messageText: {
    marginTop: 20,

    fontSize: 19,
    fontWeight: 'bold',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },

  qrCodeBox: {
    width: 350,
    height: 350,

    overflow: 'hidden',
    borderRadius: 30,
  },
});

export default ScanQr;
