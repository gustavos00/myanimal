import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import PaymentMethod from '../pages/PaymentMethod';
import CreateOrUpdateAnimal from "../pages/CreateOrUpdateAnimal";
import ViewAnimal from "../pages/ViewAnimal";

interface AnimalInfoParams {
  age: string,
  chipnumber: string,
  id: number,
  name: string,
  photourl: string,
  race: string,
  userid: number,
}

interface CreateOrUpdateAnimalParams {
  type?: string
}

interface ViewAnimalParams {
  animalInfo: AnimalInfoParams
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Settings: undefined
  PaymentMethod: undefined,
  CreateOrUpdateAnimal: CreateOrUpdateAnimalParams
  ViewAnimal: ViewAnimalParams
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
            <Screen options={{headerShown: false}} name="ViewAnimal" component={ViewAnimal}/>
          </Group>
        </Navigator>
    </NavigationContainer>
  )
}