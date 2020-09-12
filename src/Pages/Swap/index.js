import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SwapIn from './Views/SwapIn';
import Details from './Views/Details';
import MyAcceptedOffers from './Views/MyAcceptedOffers';
import SwapOut from './Views/SwapOut';
import Swap from './Views/Swap';
import { trans } from '../../Local';

const Stack = createStackNavigator();

const PageSwapIn = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ trans('nav.swap') } component={ Swap } />
      <Stack.Screen name={ trans('nav.swapIn') } component={ SwapIn } />
      <Stack.Screen name={ trans('nav.myAcceptedOffers') } component={ MyAcceptedOffers } />
      <Stack.Screen name={ trans('nav.offerDetails') } component={ Details } />
      <Stack.Screen name={ trans('nav.swapOut') } component={ SwapOut } />
    </Stack.Navigator>
  );
};

export default PageSwapIn;
