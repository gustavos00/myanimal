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
import OptionHeader from '../components/OptionHeader';
import OptionElement from '../components/OptionElement';
import Underline from '../components/Underline'
import BottomModal from '../components/BottomModal';
import PinPaymentMethod from '../components/PinPaymentMethod';
import Loading from '../components/Loading';

interface userData {
  givenname: string,
  photo: string,
}

function Settings() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  const [securityModalOpen, setSecutiryModalOpen] = useState(false);
  const [user, setUser] = useState<userData>();
  const [isLoading, setIsLoading] = useState<boolean>();
  
  const navigation = useNavigation();

  useEffect(() => {
    if(!params) {
      setIsLoading(true)
      async function getData() {
        const data = await getUserInformationFromLS()
        setUser(data)
        
        setIsLoading(false)
      }
      getData();

    } else {
      setUser({
        givenname: params.name,
        photo: params.photo
      })
    }
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
      <Header name={user?.givenname} image={user?.photo}/>

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

          <View style={styles.textContainer}>
            <OptionHeader text={'Account Settings'} /> 
            <OptionElement handleClick={async() => changeScreen('Home', false)} text={'Edit profile'}/>
            <OptionElement handleClick={() => setSecutiryModalOpen(true)} text={'Payment Methods'}/>
            <OptionElement handleClick={async () => changeScreen('Login', true)} text={'Log-out'}/>
          </View>

          <Underline />

          <View style={styles.textContainer}>
            <OptionHeader text={'More'} /> 
            <OptionElement handleClick={() => changeScreen('Home', false)} text={'About us'}/>
            <OptionElement handleClick={() => changeScreen('Home', false)} text={'Privacy Policy'}/>
          </View>
          
        </>        
      </Background>

      <Footer wichActive={'settings'} name={user?.givenname} photo={user?.photo} />

      { securityModalOpen &&
        <BottomModal swipeDownFunction={closeModal} modalHeight={430}>
          <PinPaymentMethod alreadyHavePin={true}/>
        </BottomModal>
      }

      { isLoading &&
        <Loading /> 
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
