import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, RefreshControl } from 'react-native';
import { ListItem, Card, Button, Text } from 'react-native-elements';
import API from '../../../API';
import { trans } from '../../../Local';
import { remapOffers, sortByDate } from '../../../utilities';

const MyAcceptedOffers = () => {
  const [ refreshing, setRefreshing ] = useState(false);
  const [ dances, setDances ] = useState([]);
  const [ sending, setSending ] = useState(false);
  const user = useSelector(state => state.auth.user);

  const onRefresh = () => {
    setRefreshing(true);

    API.getMyTakenOffers(user.id)
    .then(response => response.json())
    .then(json => {
      setDances(sortByDate(remapOffers(json)));
      setRefreshing(false);
    })
    .catch(e => console.log(e));
  };

  const submit = id => {
    if (sending) { return; }

    // TODO -- reject api not working
    console.error(id);

    setSending(true);
    API.rejectOffer(id, user.id).then(() => {
      setSending(false);
      onRefresh();
    })
    .catch(e => console.log(e));
  };

  useEffect(() => {
    if (user) {
      onRefresh();
    }
  }, [ user ]);

  const getList = () => {
    if (dances && Array.isArray(dances) && dances.length > 0) {
      return dances.map((item, key) =>
        <ListItem
          key={ key }
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{ `${item.date} - ${item.title}` }</ListItem.Title>
            <ListItem.Subtitle>{ `${item.subtitle}: ${item.timeFrom} - ${item.timeTo}` }</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            type='outline'
            title={ trans('myAcceptedOffers.cancelOffer') }
            onPress={ () => submit(item.offerId) }
          />
        </ListItem>
      );
    } else {
      return (
        <Text style={ { textAlign: 'center' } }>
          { trans('myAcceptedOffers.empty') }
        </Text>
      );
    }
  };

  return (
    <View>
      <ScrollView
        refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
      >
        <Card>{ getList() }</Card>
      </ScrollView>
    </View>
  );
};

export default MyAcceptedOffers;
