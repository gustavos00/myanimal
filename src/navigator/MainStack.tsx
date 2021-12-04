import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import ViewAnimal from '../pages/ViewAnimal';
import CreateAnimal from '../pages/CreateAnimal';
import UpdateAnimal from '../pages/UpdateAnimal';
import FindMyAnimal from '../pages/FindMyAnimal';

interface AnimalScreenParams {
  animalInfo: AnimalInfoParams;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Settings: undefined;
  CreateAnimal: undefined;
  ViewAnimal: AnimalScreenParams;
  UpdateAnimal: AnimalScreenParams;
  FindMyAnimal: undefined;
};

const { Navigator, Group, Screen } = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ gestureEnabled: false }}>
        <Group>
          <Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Screen
            options={{ headerShown: false }}
            name="Settings"
            component={Settings}
          />
          <Screen
            options={{ headerShown: false }}
            name="CreateAnimal"
            component={CreateAnimal}
          />
          <Screen
            options={{ headerShown: false }}
            name="ViewAnimal"
            component={ViewAnimal}
          />
          <Screen
            options={{ headerShown: false }}
            name="UpdateAnimal"
            component={UpdateAnimal}
          />
          <Screen
            options={{ headerShown: false }}
            name="FindMyAnimal"
            component={FindMyAnimal}
          />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
};
