import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import { showError } from '../utils/error';

import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentMethodsInformation from '../components/PaymentMethodsInformation';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';
import AuthContext from '../contexts/user';
import Button from '../components/Button';
import BottomModal from '../components/BottomModal';
import CardInput from '../components/CardInput';

function PaymentMethod() {
  const [addPaymentMethodModalIsOpen, setAddPaymentMethodModalIsOpen] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [cardDetails, setCardDetails] = useState<Object>();
  const { confirmPayment } = useConfirmPayment();

  const { user } = useContext(AuthContext);
  const publishableKey =
    'pk_test_51JzW9cAnuwGURQQdNokokYSzugeRd8TpkQchaK6IHOeFQgMlqs0VBZCqZPAEzgPAxhOEhJLlnNAoo1v0nsGaskJs00T9NVXpB0';

  const fetchPaymentIntentClientSecret = async () => {
    const { data } = await api.post('/user/payment');
    const { clientSecret, error } = await JSON.parse(JSON.stringify(data));

    return [clientSecret, error];
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      showError('missing data to make the payment', 'Please, insert all data.');
      return;
    }

    try {
      const [clientSecret, error] = await fetchPaymentIntentClientSecret();

      if (!error) {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: 'Card',
          billingDetails: { email },
        });

        if (error) {
          showError('Error: ' + error, 'Apparently an error occurred');
        } else if (paymentIntent) {
          showError('Payment successful', 'Payment successful');
        }
      } else {
        showError('Error' + error, 'Unable to process payment');
        return;
      }
    } catch (e) {
      showError('Error' + e, 'Apparently an error occurred');
    }
  };

  const closeModal = () => {
    setAddPaymentMethodModalIsOpen(false);
  };

  return (
    <>
      <Header name={user?.givenName} image={user?.imageUrl} />

      <Background>
        <BackgroundHeader text={'Payment methods'} />

        <PaymentMethodsInformation
          handleClickFunctionParams={setAddPaymentMethodModalIsOpen}
        />

        <Underline />
        <View style={styles.container}>
          <OptionHeader text={'Valid Payment Methods'} />
        </View>
      </Background>

      <Footer wichActive={'settings'} />

      {addPaymentMethodModalIsOpen && (
        <BottomModal swipeDownFunction={() => closeModal()} modalHeight={300}>
          <StripeProvider publishableKey={publishableKey}>
            <CardInput setValue={setCardDetails} />

            <Button text={'Add payment method'} handleClick={handlePayPress} />
          </StripeProvider>
        </BottomModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default PaymentMethod;
