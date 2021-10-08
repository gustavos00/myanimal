import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from "../pages/Login";


export type RootStackParamList = {
  Login: undefined;
}

const { Navigator, Group, Screen} = createStackNavigator<RootStackParamList>()

export default () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Group>
          <Screen options={{headerShown: false}} name="Login" component={Login}/>
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}