import API from '../../API';

const defaultValues = {
  userToken: null,
  isLoading: false,
  url: '',
  user: null
};

const auth = (state = defaultValues, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null
      };
    case 'SET_URL':
      return {
        ...state,
        url: action.url
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export const updateAPI = () => next => action => {
  switch (action.type) {
    case 'SIGN_IN':
      API.setToken(action.token);
      break;
    case 'SIGN_OUT':
      API.setToken(null);
      break;
    case 'SET_URL':
      API.setURL(action.url);
      break;
  }

  return next(action);
};

export default auth;
