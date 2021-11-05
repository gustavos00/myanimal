import React, { useContext } from 'react';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentMethodsInformation from '../components/PaymentMethodsInformation';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';
import AuthContext from '../contexts/user';

interface userData {
  givenname: string,
  photo: string,
}

function PaymentMethod() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header name={user?.givenname} image={user?.photourl}/>

      <Background>
        <BackgroundHeader text={'Payment methods'}/>

        <PaymentMethodsInformation />

        <Underline />
        <OptionHeader text={'Valid Payment Methods'}/>
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

export default PaymentMethod;
