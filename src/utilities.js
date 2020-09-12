import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';
import { setUser, restoreToken, setUrl } from './redux/actions';

export const sortByDate = arr => {
  let a = [ ...arr ];
  return a.sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 0 : 1
  );
};

export const remapOffers = arr => arr.map(el => ({
  offerId: Number(el.offer_id),
  date: el.lesson_date.split(' ')[0],
  courseId: Number(el.course_id),
  hall: el.course.hall,
  takingUserId: Number(el.taking_user_id),
  offeringUserName: el.offering_user.display_name,
  isFollow: Number(el.registration.dancing_as),
  timeFrom: el.course.time_from,
  timeTo: el.course.time_to,
  title: el.course.title,
  subtitle: el.course.sub_header,
  note: el.note
}));

export const parseOffers = offers => {
  const groupBy = (arr, prop) => {
    return arr.reduce(function(groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  const groupNested = (input, val) => {
    Object.keys(input).map(date =>
      input[date] = groupBy(input[date], val)
    );

    return { ...input };
  };

  const calcMetaForOffers = arr => {
    let missingFollow = arr.reduce(((acc, curr) => acc + curr.isFollow), 0);;
    let missingLead = arr.length - missingFollow;
    return { missingFollow, missingLead };
  };

  offers = remapOffers(offers);
  offers = groupNested(groupBy(offers, 'date'), 'courseId');

  Object.keys(offers).map(date =>
    Object.keys(offers[date]).map(courseId =>
      offers[date][courseId] = {
        ...calcMetaForOffers(offers[date][courseId]),
        offers: offers[date][courseId],
        title: offers[date][courseId][0].title,
        hall: offers[date][courseId][0].hall,
        subtitle: offers[date][courseId][0].subtitle,
        timeFrom: offers[date][courseId][0].timeFrom,
        timeTo: offers[date][courseId][0].timeTo,
        date
      }
    )
  );

  return offers;
};

export const storeUser = (url, token, user) => {
  SecureStore.setItemAsync('url', url).catch(
    (e) => console.log('Storing url failed', e)
  );
  SecureStore.setItemAsync('userToken', token.toString()).catch(
    (e) => console.log('Storing token failed', e)
  );
  AsyncStorage.setItem('user', JSON.stringify(user)).catch(
    (e) => console.log('Storing user failed', e)
  );
};

export const restoreUser = async dispatch => {
  let userToken = null;
  let url = null;
  let user = null;

  try {
    userToken = await SecureStore.getItemAsync('userToken');
    url = await SecureStore.getItemAsync('url');
  } catch (e) {
    console.log('Retrieving the token or the url failed', e);
    return;
  }

  if (userToken) {
    try {
      const json = await AsyncStorage.getItem('user');
      user = json !== null ? JSON.parse(json) : null;
    } catch (e) {
      console.log('Retrieving the user failed', e);
      return;
    }
  }

  // TODO After restoring token, we may need to validate it in production apps
  dispatch(restoreToken(userToken));
  dispatch(setUrl(url));
  dispatch(setUser(user));
};

export const capitalize = str => {
  if (typeof str === 'string') {
    return str.replace(/^\w/, c => c.toUpperCase());
  } else {
    return '';
  }
};
