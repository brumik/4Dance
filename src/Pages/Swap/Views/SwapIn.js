import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, RefreshControl } from 'react-native';
import { Card, ListItem, Text, Badge } from 'react-native-elements';
import moment from 'moment';
import { useSelector } from 'react-redux';
import API from '../../../API';
import { parseOffers } from '../../../utilities';
import { trans } from '../../../Local';

const FreeClassesList = ({ dances, onOpen }) => {
  const getBadgeStatus = (dance) => {
    return dance.missingLead === dance.missingFollow ?
      'success' : 'warning';
  };

  const readableDate = (d) => {
    let date = moment(d, 'YYYY-MM-DD');
    return date.calendar(moment(), {
      sameDay: `[${trans('moment.today')}]`,
      nextDay: `[${trans('moment.tomorrow')}]`,
      nextWeek: 'dddd',
      sameElse: 'YYYY-M-DD'
    });
  };

  return (
    Object.keys(dances).sort().map((date, key) => (
      <Card key={ key }>
        <Card.Title style={ { textAlign: 'left' } }>
          { readableDate(date) }
        </Card.Title>
        <Card.Divider />
        {
          Object.keys(dances[date]).map((courseId, key) => {
            let course = dances[date][courseId];
            return (
              <ListItem
                key={ key }
                onPress={ () => onOpen(course) }
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{ course.title }</ListItem.Title>
                  <ListItem.Subtitle>{ `${course.subtitle}: ${course.timeFrom} - ${course.timeTo}` }</ListItem.Subtitle>
                </ListItem.Content>
                <Badge
                  value={ `${course.missingLead} L / ${course.missingFollow} F` }
                  status={ getBadgeStatus(course) }
                />
                <ListItem.Chevron />
              </ListItem>
            );
          })
        }
      </Card>
    ))
  );
};

FreeClassesList.propTypes = {
  dances: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired
};

const LastCard = () => (
  <Card>
    <Card.Title>{ trans('swapin.noMoreSpaces') }</Card.Title>
    <Card.Divider />
    <Text style={ { textAlign: 'center' } }>{ trans('swapin.comeBack') }</Text>
  </Card>
);

const SwapIn = ({ navigation }) => {
  const [ refreshing, setRefreshing ] = useState(false);
  const [ dances, setDances ] = useState(null);
  const user = useSelector(state => state.auth.user);

  const onRefresh = () => {
    setRefreshing(true);

    API.getAvaiableOffers(user.id)
    .then(json => {
      console.log(json);
      setDances(parseOffers(json));
      setRefreshing(false);
    })
    .catch(e => console.log(e));
  };

  useEffect(() => {
    if (user) {
      onRefresh();
    }
  }, [ user ]);

  const navigateToDetails = course => {
    navigation.navigate(trans('nav.offerDetails'), { ...course });
  };

  return (
    <View>
      <ScrollView
        refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
      >
        { <FreeClassesList dances={ dances ? dances : {} } onOpen={ navigateToDetails } /> }
        { <LastCard /> }
      </ScrollView>
    </View>
  );
};

SwapIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default SwapIn;
