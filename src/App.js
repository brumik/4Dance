import React from 'react';
import { init } from './Local';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import Navigation from './Navigation';
import { updateAPI } from './redux/reducers/auth';

const store = createStore(
  rootReducer,
  applyMiddleware(updateAPI)
);

const App = () => {
  init();

  return (
    <Provider store={ store }>
      <Navigation />
    </Provider>
  );
};

export default App;
