import React, { useEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';
import { deleteStorageItem } from '../utils/localStorage';
import { getUserInformationFromLS } from '../utils/user';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SettingsHeader from '../components/SettingsHeader';
import SettingsElement from '../components/SettingsElement';
import Underline from '../components/Underline'
import BottomModal from '../components/BottomModal';
import PinPaymentMethod from '../components/PinPaymentMethod';


interface animalData {
  age: string,
  chipnumber: string,
  id: string,
  name: string,
  photourl: string,
  race: string,
  userid: string,
}

interface userData {
  id: string,
  givenname: string,
  lastname: string,
  photo: string,
  email: string
  animalData: Array<animalData>,
}

function Settings() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  const [securityModalOpen, setSecutiryModalOpen] = useState(false);
  const [user, setUser] = useState<userData>();
  const [isLoading, setIsLoading] = useState<boolean>();
  
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true)
    async function getData() {
      const data = await getUserInformationFromLS()
      setUser(data)
      setIsLoading(false)
    }
    getData();
  }, [])


  const closeModal = () => {
    setSecutiryModalOpen(false);
  }

  const changeScreen = async (screenName : string, clearStorage : boolean) => {
    navigation.navigate(screenName as any)

    if(clearStorage) {
      await deleteStorageItem('token')
    }
  }
 
  return (
    <>
      <Header name={params.name} image={params.photo}/>

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

          <View style={styles.textContainer}>
            <SettingsHeader text={'Account Settings'} /> 
            <SettingsElement handleClick={async() => changeScreen('Home', false)} text={'Edit profile'}/>
            <SettingsElement handleClick={() => setSecutiryModalOpen(true)} text={'Payment Methods'}/>
            <SettingsElement handleClick={async () => changeScreen('Login', true)} text={'Log-out'}/>
          </View>

          <Underline />

          <View style={styles.textContainer}>
            <SettingsHeader text={'More'} /> 
            <SettingsElement handleClick={() => changeScreen('Home', false)} text={'About us'}/>
            <SettingsElement handleClick={() => changeScreen('Home', false)} text={'Privacy Policy'}/>
          </View>
          
        </>        
      </Background>

      <Footer wichActive={'settings'} name={user?.givenname} photo={user?.photo} />

      { securityModalOpen &&
        <BottomModal swipeDownFunction={closeModal} modalHeight={430}>
          <PinPaymentMethod />
        </BottomModal>
      }
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 35,
    marginRight: 55,
    marginTop: 20,
  },
})

export default Settings;
