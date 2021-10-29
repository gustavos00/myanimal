import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import PaymentMethod from '../pages/PaymentMethod';
import CreateOrUpdateAnimal from "../pages/CreateOrUpdateAnimal";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Settings: {
    name: string,
    photo: string
  };
  PaymentMethod: undefined,
  CreateOrUpdateAnimal: undefined
}

const {Navigator, Group, Screen} = createStackNavigator<RootStackParamList>()

export default () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{gestureEnabled: false}}>
        <Group>
          <Screen options={{headerShown: false}} name="Login" component={Login}/>
          <Screen options={{headerShown: false}} name="Home" component={Home}/>
          <Screen options={{headerShown: false}} name="Settings" component={Settings}/>
          <Screen options={{headerShown: false}} name="PaymentMethod" component={PaymentMethod}/>
          <Screen options={{headerShown: false}} name="CreateOrUpdateAnimal" component={CreateOrUpdateAnimal}/>
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}