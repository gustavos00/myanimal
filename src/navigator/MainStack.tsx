import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AnimalData } from '../types/AnimalData';
import { AnimalOwnerAddressData } from '../types/AnimalOwnerAddressData';

import SplashScreen from '../pages/SplashScreen';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import ViewAnimal from '../pages/ViewAnimal';
import CreateAnimal from '../pages/CreateAnimal';
import UpdateAnimal from '../pages/UpdateAnimal';
import FindMyAnimal from '../pages/FindMyAnimal';
import ViewProfile from '../pages/ViewProfile';
import AboutUs from '../pages/AboutUs';
import ScanQR from '../pages/ScanQR';
import FriendsRequests from '../pages/FriendsRequests';
import UpdateProfile from '../pages/UpdateProfile';
import Friends from '../pages/Friends';
import Chat from '../pages/Chat';

interface AnimalScreenParams {
  animalInfo: AnimalData;
}

interface OwnerContactsParams {
  ownerData: AnimalOwnerAddressData;
}

interface HomeAddressStatusParams {
  haveAddress?: boolean;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: HomeAddressStatusParams;
  Login: undefined;
  Settings: undefined;
  CreateAnimal: undefined;
  ViewAnimal: AnimalScreenParams;
  UpdateAnimal: AnimalScreenParams;
  FindMyAnimal: OwnerContactsParams;
  ViewProfile: undefined;
  UpdateProfile: undefined;
  AboutUs: undefined;
  ScanQR: undefined;
  FriendsRequests: undefined;
  Friends: undefined;
  Chat: undefined;
};

const { Navigator, Group, Screen } = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ gestureEnabled: false }}>
        <Group>
          <Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
          <Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Screen options={{ headerShown: false }} name="ScanQR" component={ScanQR} />
          <Screen
            options={{ headerShown: false }}
            name="FriendsRequests"
            component={FriendsRequests}
          />
          <Screen options={{ headerShown: false }} name="Friends" component={Friends} />
          <Screen options={{ headerShown: false }} name="Settings" component={Settings} />
          <Screen options={{ headerShown: false }} name="AboutUs" component={AboutUs} />
          <Screen options={{ headerShown: false }} name="ViewProfile" component={ViewProfile} />
          <Screen options={{ headerShown: false }} name="UpdateProfile" component={UpdateProfile} />
          <Screen options={{ headerShown: false }} name="CreateAnimal" component={CreateAnimal} />
          <Screen options={{ headerShown: false }} name="ViewAnimal" component={ViewAnimal} />
          <Screen options={{ headerShown: false }} name="UpdateAnimal" component={UpdateAnimal} />
          <Screen options={{ headerShown: false }} name="FindMyAnimal" component={FindMyAnimal} />
          <Screen options={{ headerShown: false }} name="Chat" component={Chat} />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
};
