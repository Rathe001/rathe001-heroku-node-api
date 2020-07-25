import { takeEvery, call, select } from 'redux-saga/effects';
import playersActions from './actions';

function* send({ payload, request }) {
  
  try {
    const players = yield select(state => state.players);

    const data = Object.keys(players).reduce((acc, id) => ({
      ...acc,
      [id]: {
        position: players[id].position,
      }
    }), {});
    Object.keys(players).forEach(id => players[id].connection.sendUTF(JSON.stringify(data)));
  } catch (e) {
    // nothing
  }
}

export default [
  takeEvery(playersActions.ADD, send),
  takeEvery(playersActions.MOVE_UP, send),
  takeEvery(playersActions.MOVE_DOWN, send),
  takeEvery(playersActions.MOVE_LEFT, send),
  takeEvery(playersActions.MOVE_RIGHT, send),
];
