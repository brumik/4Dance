import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, ListItem, Button } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../../Components/Loading';
import API from '../../../API';
import { trans } from '../../../Local';
import { capitalize } from '../../../utilities';

const Details = ({ route, navigation }) => {
  const {
    title,
    subtitle,
    timeFrom,
    timeTo,
    hall,
    date,
    offers
  } = route.params;
  const [ sending, setSending ] = useState(false);
  const user = useSelector(state => state.auth.user);

  const offerTitle = el => {
    const part = el.isFollow ? trans('swapin.follower') : trans('swapin.leader');
    return capitalize(`${part} ${trans('swapin.from')} ${el.offeringUserName}`);
  };

  const submit = id => {
    if (sending) { return; }

    setSending(true);
    API.acceptOffer(id, user.id).then(() => {
      navigation.navigate(trans('nav.myAcceptedOffers'));
    })
    .catch(e => console.log(e));
  };

  const details = [
    {
      key: 'time',
      icon: 'md-time',
      title: `${date}: ${timeFrom} - ${timeTo}`
    },
    {
      key: 'hall',
      icon: 'md-home',
      title: hall.title
    },
    {
      key: 'address',
      icon: 'md-map',
      title: hall.address

    }
  ];

  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Title>{ `${title} - ${subtitle}` }</Card.Title>
          <Card.Divider />
          {
            details.map(item => (
              <ListItem key={ item.key }>
                <Ionicons name={ item.icon } size={ 25 }/>
                <ListItem.Content>
                  <ListItem.Title>{ item.title }</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
          <Card.Divider />
          <View>
            { sending && <Loading /> }
            { !sending &&
              offers.map((item, key) => (
                <ListItem
                  key={ key }
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>{ offerTitle(item) }</ListItem.Title>
                    {
                      item.notes && <ListItem.Subtitle>{ item.note }</ListItem.Subtitle>
                    }
                  </ListItem.Content>
                  <Button
                    type='outline'
                    title='I take it!'
                    onPress={ () => submit(item.offerId) }
                  />
                </ListItem>
              ))
            }
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  navigation: PropTypes.object
};

export default Details;
