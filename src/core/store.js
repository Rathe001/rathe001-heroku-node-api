import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initialState from '../constants/initialState';

import coreReducers from './reducers';
import coreSagas from './sagas';

let store;

const getStore = () => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    store = createStore(
      coreReducers,
      initialState,
      compose(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(coreSagas);
  }

  return store;
};

export default getStore;
