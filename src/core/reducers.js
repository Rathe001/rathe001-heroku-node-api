import { combineReducers } from 'redux';
import players from './players/reducers';

const appReducer = combineReducers({
  players,
});

export default (state, action) => {
  return appReducer(state, action);
};
