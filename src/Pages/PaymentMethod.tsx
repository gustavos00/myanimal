import React, { useState } from 'react';

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
  const [user, setUser] = useState<userData>();
  const [isLoading, setIsLoading] = useState<boolean>();

  return (
    <>
      <Header name={user?.givenname} image={user?.photo}/>

      <Background>
        <BackgroundHeader text={'Payment methods'}/>

        <PaymentMethodsInformation />

        <Underline />
        <OptionHeader text={'Valid Payment Methods'}/>
      </Background>

      <Footer wichActive={'settings'} />

      { isLoading &&
        <Loading /> 
      }
    </>
  );
}

export default PaymentMethod;
