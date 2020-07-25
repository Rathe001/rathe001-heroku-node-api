import { all } from 'redux-saga/effects';
import playersSagas from './players/sagas';

const combinedSagas = [...playersSagas, ];

export default function* sagas() {
  yield all(combinedSagas);
}
