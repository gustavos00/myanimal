import React from 'react';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentMethodsInformation from '../components/PaymentMethodsInformation';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';

function PaymentMethod() {
  return (
    <>
       <Header name={'user?'} image={'user?.photo'}/>

       <Background>
          <BackgroundHeader text={'Payment methods'}/>

          <PaymentMethodsInformation />

          <Underline />
          <OptionHeader text={'Valid Payment Methods'}/>
       </Background>

       <Footer name={''} photo={''} wichActive={''} />
    </>
  );
}

export default PaymentMethod;
