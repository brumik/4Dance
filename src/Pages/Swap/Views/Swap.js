import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { trans } from '../../../Local';

const Swap = ({ navigation }) => {
  const items = [
    {
      title: trans('nav.swapIn'),
      onPress: () => navigation.navigate(trans('nav.swapIn'))
    },
    {
      title: trans('nav.swapOut'),
      onPress: () => navigation.navigate(trans('nav.swapOut'))
    },
    {
      title: trans('nav.myAcceptedOffers'),
      onPress: () => navigation.navigate(trans('nav.myAcceptedOffers'))
    }
  ];

  return (
    <ScrollView>
      {
        items.map((item, i) => (
          <ListItem key={ i }
            onPress={ item.onPress }
            bottomDivider
          >
            <ListItem.Content >
              <ListItem.Title>{ item.title }</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>
  );
};

Swap.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Swap;
