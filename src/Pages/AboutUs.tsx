import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';

import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../assets/styles/global';

function AboutUs() {
  return (
    <>
      <>
        <Header text={'Hello There'} />
        <Background>
          <>
            <Underline />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                myAnimal has the purpose of helping you gather all the information about your pet on
                your mobile phone! For this to happen, you can register, choose the best
                veterinarian and have access to reports with all the documents involved in the trips
                of your best friend to the vet!
              </Text>
              <Text style={styles.text}>
                We want all your best friend's information to be controlled by you and in case of
                emergencies to be easily accessible and in one place.
              </Text>
            </View>
          </>
        </Background>

        <Footer wichActive={'home'} />
      </>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 35,
    marginRight: 55,
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    color: globalStyles.darkGray,
  },
});

export default AboutUs;
