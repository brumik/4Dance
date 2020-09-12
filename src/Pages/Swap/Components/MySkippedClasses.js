import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ListItem, Card, Button, Text } from 'react-native-elements';
import API from '../../../API';
import { trans } from '../../../Local';

const MySkippedClasses = ({ classes, refresh }) => {
  const [ sending, setSending ] = useState(false);
  const user = useSelector(state => state.auth.user);

  const submit = id => {
    if (sending) { return; }

    setSending(true);
    API.deleteOffer(id, user.id).then(() => {
      setSending(false);
      refresh();
    })
    .catch(e => console.log(e));
  };

  return (
    <Card>
      <Card.Title>{ trans('swapout.skippedClasses') }</Card.Title>
      <Card.Divider />
      {
        classes.map((item, key) => {
          return (
            <ListItem
              key={ key }
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{ `${item.date} - ${item.title}` }</ListItem.Title>
                <ListItem.Subtitle>{ `${item.subtitle}: ${item.timeFrom} - ${item.timeTo}` }</ListItem.Subtitle>
              </ListItem.Content>
              {
                item.takingUserId !== null ? <Button
                  type='outline'
                  title={ trans('myoffers.delete') }
                  loading={ sending }
                  onPress={ () => submit(item.offerId) }
                /> : <Text>{ trans('myoffers.taken') }</Text>
              }
            </ListItem>
          );
        })
      }
    </Card>
  );
};

MySkippedClasses.propTypes = {
  classes: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
};

export default MySkippedClasses;
