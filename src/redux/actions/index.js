export const startLoading = () => ({
  type: 'START_LOADING'
});

export const restoreToken = token => ({
  type: 'SIGN_IN',
  token
});

export const setUser = user => ({
  type: 'SET_USER',
  user
});

export const signIn = token => ({
  type: 'SIGN_IN',
  token
});

export const signOut = () => ({
  type: 'SIGN_OUT'
});

export const setUrl = url => ({
  type: 'SET_URL',
  url
});
