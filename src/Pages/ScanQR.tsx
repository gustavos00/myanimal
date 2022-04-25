import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core';
import { showError } from '../utils/error';
import { generateUrlSearchParams } from '../utils/URLSearchParams';

import api from '../api/api';

import Header from '../components/Header';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Button from '../components/Button';
import UserContext from '../contexts/user';
import StatesContext from '../contexts/states';
import Loading from '../components/Loading';
import Scroll from '../components/Scroll';
import globalStyles from '../assets/styles/global';

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

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted' ? true : false);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleQRCodeScanned = async ({ type, data }: HandleScanCode) => {
    setScanned(true);

    if (type === 'org.iso.QRCode' || Number(type) == 256) {
      setIsLoading(true);
      try {
        const QRData = generateUrlSearchParams({ token: data, fromWho: user?.idUser });
        const response = await api.post('user/friends/verifyToken', QRData);
        setIsLoading(false);
        if (response.status === 200) {
          Alert.alert('You are already friends, please check!');
        } else {
          Alert.alert('Your friend request has made with success');
          navigation.navigate('Home' as never, { haveAddress: true } as never);
        }
      } catch (e: any) {
        setIsLoading(false);
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    } else {
      setIsLoading(false);
      showError('Invalid QR code readed', 'Please, read a valid QR code.');
    }
  };

  //Check permissions and return the screens
  if (hasPermission === null)
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );

  if (hasPermission === false)
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button text={'Allow Camera'} handleClick={() => askForCameraPermission()} />
      </View>
    );

  return (
    <>
      <Header text={'New friends, hm?'} />
      <Background>
        <>
          <BackgroundHeader text={'Scan Friend QR Code'} />

          <Scroll>
            <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
                style={styles.qrCodeBox}
              />

              {scanned && <Button handleClick={() => setScanned(false)} text={'Re-scan'} />}
            </View>
          </Scroll>

          <Footer wichActive={'settings'} />
        </>
      </Background>

      {isLoading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: globalStyles.fullDeviceHeight * .65,
    paddingHorizontal: 20,
    paddingTop: 20,

    justifyContent: 'space-evenly'
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
