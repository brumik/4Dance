import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';

const WrappedPicker = ({ selectedValue, onValueChange, label, items, defaultItem }) => {

  const styles = StyleSheet.create({
    wrapper: {
      margin: 10,
      marginBottom: 25
    },
    label: {
      fontWeight: 'bold',
      color: '#86939e',
      fontSize: 16
    },
    divider: {
      marginBottom: 0
    }
  });

  return (
    <View style= { styles.wrapper }>
      <Text style={ styles.label }>{ label }</Text>
      <Picker
        selectedValue={ selectedValue }
        onValueChange={ onValueChange }
      >
        <Picker.Item label={ defaultItem.label } value={ defaultItem.value } />
        {
          items.map(item => (
            <Picker.Item
              key={ item.value }
              label={ item.label }
              value={ item.value } />
          ))
        }
      </Picker>
      <Divider style={ styles.divider } />
    </View>
  );
};

WrappedPicker.propTypes = {
  selectedValue: PropTypes.any.isRequired,
  onValueChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  defaultItem: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  }).isRequired
};

export default WrappedPicker;
