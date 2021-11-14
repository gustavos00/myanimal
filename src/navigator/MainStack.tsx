import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import PaymentMethod from '../pages/PaymentMethod';
import ViewAnimal from "../pages/ViewAnimal";
import CreateAnimal from '../pages/CreateAnimal';
import UpdateAnimal from "../pages/UpdateAnimal";

interface AnimalInfoParams {
  age: string,
  chipnumber: string,
  id: number,
  name: string,
  photourl: string,
  race: string,
  userid: number,
}

interface AnimalScreenParams {
  animalInfo: AnimalInfoParams
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Settings: undefined
  PaymentMethod: undefined,
  CreateAnimal: undefined,
  ViewAnimal: AnimalScreenParams,
  UpdateAnimal: AnimalScreenParams,
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
            <Screen options={{headerShown: false}} name="CreateAnimal" component={CreateAnimal}/>
            <Screen options={{headerShown: false}} name="ViewAnimal" component={ViewAnimal}/>
            <Screen options={{headerShown: false}} name="UpdateAnimal" component={UpdateAnimal}/>
          </Group>
        </Navigator>
    </NavigationContainer>
  )
}