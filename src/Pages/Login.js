import React, { useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Picker from '../Components/Picker';
import { setUser, signIn, startLoading, setUrl } from '../redux/actions';
import { trans } from '../Local';
import API from '../API';
import urls from '../schoolList';
import { storeUser } from '../utilities';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});

const Login = () => {
  const [ fields, setFields ] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const url = useSelector(state => state.auth.url) ?? '';

  const onLogin = () => {
    dispatch(startLoading());

    API.signIn(fields)
    .then(({ errors, data }) => {
      if (errors) {
        ToastAndroid.show(errors.message, ToastAndroid.LONG);
      }

      if (data) {
        const { token, ...user } = data;
        storeUser(url, token, user);
        dispatch(setUser(user));
        dispatch(signIn(token));
      }
    })
    .catch(e => console.error(e));
  };

  const onPickerChange = selected => {
    dispatch(setUrl(selected));
  };

  return (
    <ScrollView contentContainerStyle={ styles.wrapper }>
      <Card>
        <Picker
          selectedValue={ url }
          onValueChange={ onPickerChange }
          label={ trans('auth.selectSchool') }
          items={ urls }
          defaultItem={ {
            label: trans('auth.selectSchool'),
            value: ''
          } }
        />
        <Input
          label={ trans('auth.username') }
          autoCompleteType='email'
          placeholder={ trans('auth.username') }
          leftIcon={ { type: 'ionicon', name: 'md-mail' } }
          value={ fields.email }
          onChangeText={ email => setFields({ ...fields, email }) }
        />
        <Input
          secureTextEntry={ true }
          autoCompleteType='password'
          label={ trans('auth.password') }
          placeholder={ trans('auth.password') }
          leftIcon={ { type: 'ionicon', name: 'md-lock' } }
          value={ fields.password }
          onChangeText={ password => setFields({ ...fields, password }) }
        />
        <Button
          title={ trans('auth.login') }
          loading={ isLoading }
          onPress={ onLogin }
        />
      </Card>
    </ScrollView>
  );
};

export default Login;
