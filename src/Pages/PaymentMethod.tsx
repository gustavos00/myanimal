import React, { useEffect, useState } from 'react';
import { getUserInformationFromLS } from '../utils/user';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentMethodsInformation from '../components/PaymentMethodsInformation';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';
import Loading from '../components/Loading';

interface userData {
  givenname: string,
  photo: string,
}

function PaymentMethod() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  const [user, setUser] = useState<userData>();
  const [isLoading, setIsLoading] = useState<boolean>();

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

  return (
    <>
       <Header name={user?.givenname} image={user?.photo}/>

       <Background>
          <BackgroundHeader text={'Payment methods'}/>

          <PaymentMethodsInformation />

          <Underline />
          <OptionHeader text={'Valid Payment Methods'}/>
       </Background>

       <Footer name={user?.givenname} photo={user?.photo} wichActive={'settings'} />

       { isLoading &&
        <Loading /> 
      }
    </>
  );
}

export default PaymentMethod;
