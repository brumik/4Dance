import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import User from './Views/User';
import MyClasses from './Views/MyClasses';

const Stack = createStackNavigator();

const PageUser = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={ User } />
      <Stack.Screen name="My Classes" component={ MyClasses } />
    </Stack.Navigator>
  );
};

export default PageUser;
