import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../pages/Home";

export type RootStackParamList = {
  Home: undefined;
}

const {Navigator, Group, Screen} = createStackNavigator<RootStackParamList>()

export default () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{gestureEnabled: false}}>
        <Group>
          <Screen options={{headerShown: false}} name="Home" component={Home}/>
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}