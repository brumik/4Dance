import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { trans } from '../../../Local';
import { signOut } from '../../../redux/actions';

const User = ({ navigation }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    SecureStore.deleteItemAsync('userToken').catch((e) =>
      console.log('Deleting token failed', e)
    );
    dispatch(signOut());
  };

  const items = [
    {
      title: trans('nav.myclasses'),
      icon: 'md-calendar',
      onPress: () => navigation.navigate('My Classes')
    },
    {
      title: trans('auth.logout'),
      icon: 'md-exit',
      onPress: onLogout
    }
  ];

  return (
    <ScrollView>
      {
        items.map((item, i) => (
          <ListItem
            key={ i }
            onPress={ item.onPress }
            bottomDivider
          >
            <Ionicons name={ item.icon } size={ 25 }/>
            <ListItem.Content>
              <ListItem.Title>{ item.title }</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>
  );
};

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default User;
