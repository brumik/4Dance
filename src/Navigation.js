import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Swap, User, Login } from './Pages';
import { restoreUser } from './utilities';
import { trans } from './Local';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const userToken = useSelector(state => state.auth.userToken);
  const dispatch = useDispatch();

  React.useEffect(() => {
    restoreUser(dispatch);
  }, []);

  const routeIcons = (route) => ({ size, color }) => {
    let iconName;

    if (route.name === 'Offers') {
      iconName = 'md-swap';
    } else if (route.name === 'User') {
      iconName = 'md-contact';
    }

    return <Ionicons name={ iconName } size={ size } color={ color } />;
  };

  return (
    <NavigationContainer>
      {userToken === null ? (
        <Login />
      ) : (
        <Tab.Navigator
          screenOptions={ ({ route }) => ({
            tabBarIcon: routeIcons(route)
          }) }
        >
          <Tab.Screen name={ trans('nav.swap') } component={ Swap } />
          <Tab.Screen name={ trans('nav.user') } component={ User } />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );

};

export default Navigation;
