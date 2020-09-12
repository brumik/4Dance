import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';
import moment from 'moment';

const WrappedDatePicker = ({ label, date, setDate }) => {
  const [ show, setShow ] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const styles = StyleSheet.create({
    wrapper: {
      marginBottom: 20
    }
  });

  return (
    <View style={ styles.wrapper }>
      <TouchableHighlight
        onPress={ () => setShow(true) }
        activeOpacity={ 1 }
        underlayColor='#FFF'
      >
        <Input
          label={ label }
          value={ moment(date).format('D/MM/YYYY') }
          disabled
        />
      </TouchableHighlight>
      {show && (
        <DateTimePicker
          value={ date }
          mode="date"
          display="default"
          onChange={ onChange }
        />
      )}
    </View>
  );
};

WrappedDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired
};

export default WrappedDatePicker;
