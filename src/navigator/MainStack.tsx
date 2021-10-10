import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from "../pages/Login";
import Home from "../pages/Home"
import SplashScreen from '../pages/SplashScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: { id: number};
  SplashScreen: undefined,
}

const {Navigator, Group, Screen} = createStackNavigator<RootStackParamList>()

export default () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{gestureEnabled: false}}>
        <Group>
          <Screen options={{headerShown: false}} name="Login" component={Login}/>
          <Screen options={{headerShown: false}} name="Home" component={Home}/>
          <Screen options={{headerShown: false}} name="SplashScreen" component={SplashScreen}/>
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}