import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const Login = () => {
  return (
    <>
    <SafeAreaView />
      <View style={styles.wave}>
        <Text>Login Wave here</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Text>Google log-in</Text>
        </View>

        <View style={styles.button}>
          <Text>Facebook log-in</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wave: {
    height: '60%',
    width: '100%',

    borderWidth: 1,
    borderColor: 'red'
  },

  button: {
    width: 280,
    marginBottom: 15,
    marginTop: 15,
    
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green'
  },

  buttonsContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'blue',
  }
})

export default Login