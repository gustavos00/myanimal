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
import UserContext from '../contexts/user';
import StatesContext from '../contexts/states';
import Loading from '../components/Loading';

interface HandleScanCode {
  type: string;
  data: string;
}

function ScanQr() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(StatesContext);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted' ? true : false);
    })();
  };

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

    if (type === 'org.iso.QRCode' || Number(type) == 256) {
      setIsLoading(true);
      try {
        await api.get(`user/friends/verifyToken?token=${data}&fromWho=${user?.idUser}`);

        Alert.alert('Your friend request has made with success');
        setIsLoading(false);
        navigation.navigate('Home' as never, { haveAddress: true } as never);
      } catch (e: any) {
        setIsLoading(false);
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    } else {
      setIsLoading(false);
      showError('Invalid QR code readed', 'Please, read a valid QR code.');
    }
  };

  const enableReScan = () => {
    setScanned(false);
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

            {!scanned && (
              <>
                <Button handleClick={enableReScan} text={'Re-scan'} />
              </>
            )}
          </View>

          <Footer wichActive={'settings'} />
        </>
      </Background>

      {isLoading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    height: '80%',

    borderRadius: 30,
  },
});

export default ScanQr;
