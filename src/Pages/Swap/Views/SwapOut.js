import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Picker from '../../../Components/Picker';
import { trans } from '../../../Local';
import API from '../../../API';
import MySkippedClasses from '../Components/MySkippedClasses';
import { remapOffers, sortByDate } from '../../../utilities';

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  rowChildren: {
    flex: 1
  }
});

const SwapOut = () => {
  const [ refreshing, setRefreshing ] = useState(false);
  const [ classes, setClasses ] = useState([]);
  const [ registrationId, setRegistrationId ] = useState(0);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ note, setNote ] = useState('');
  const [ dances, setDances ] = useState([]);
  const [ date, setDate ] = useState('');
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const user = useSelector(state => state.auth.user);

  const closeForm = () => {
    setRegistrationId(0);
    setNote('');
    setDate('');
    setIsFormOpen(false);
  };

  const getLessonDates = () => {
    const dance = dances.find(el => el.registration_id === registrationId);
    return dance ? dance.course.lesson_dates : [];
  };

  const updateClasses = () =>
    API.getMyOffers(user.id)
    .then(response => response.json())
    .then(json => {
      setClasses(sortByDate(remapOffers(json)));
    })
    .catch(e => console.error(e));

  const onRefresh = () => {
    setRefreshing(true);
    updateClasses().then(() => setRefreshing(false));
  };

  useEffect(() => {
    onRefresh();

    // Get the classes at which the user is attending
    API.getRegistrations(user.id)
    .then(response => response.json())
    .then(json => {
      setDances(json);
    })
    .catch(e => console.error(e));
  }, []);

  const onSubmit = () => {
    setIsSubmitting(true);

    API.createOffer(
      registrationId,
      user.id,
      date,
      note
    )
    .then(() => {
      setIsSubmitting(false);
      closeForm();
      onRefresh();
    })
    .catch(e => console.log('error', e));
  };

  return (
    <ScrollView
      refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
    >
      { !isFormOpen &&
        <Card>
          <Button
            title={ trans('swapout.createOffer') }
            onPress={ () => setIsFormOpen(true) }
          />
        </Card>
      }
      { isFormOpen &&
        <Card>
          <Card.Title>{ trans('swapout.title') }</Card.Title>
          <Picker
            selectedValue={ registrationId }
            onValueChange={ setRegistrationId }
            label={ trans('swapout.selectClass') }
            items={ dances.map(i => ({
              label: `${i.course.title} - ${i.course.sub_header}`,
              value: i.registration_id
            })) }
            defaultItem={ {
              label: trans('swapout.selectDefault'),
              value: 0
            } }
          />
          { registrationId !== 0 &&
            <Picker
              selectedValue={ date }
              onValueChange={ setDate }
              label={ trans('swapout.selectDate') }
              items={ getLessonDates().map(i => ({
                label: i,
                value: i
              })) }
              defaultItem={ {
                label: trans('swapout.selectDate'),
                value: ''
              } }
              disabled={ registrationId === 0 }
            />
          }
          <Input
            label={ trans('swapout.notes') }
            placeholder={ trans('swapout.notesPlaceholder') }
            value={ note }
            onChangeText={ setNote }
          />
          <View style={ styles.rowContainer }>
            <Button containerStyle={ styles.rowChildren }
              title={ trans('swapout.submit') }
              loading={ isSubmitting }
              onPress={ onSubmit }
              disabled={ !getLessonDates().includes(date) }
            />
            <Button containerStyle={ styles.rowChildren }
              type='outline'
              title={ trans('swapout.cancel') }
              onPress={ closeForm }
            />
          </View>
        </Card>
      }
      <MySkippedClasses classes={ classes } refresh={ onRefresh } />
    </ScrollView>
  );
};

export default SwapOut;
