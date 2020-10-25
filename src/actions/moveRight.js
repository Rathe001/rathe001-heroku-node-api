import store from '../constants/store';
import sendUpdate from './sendUpdate';

const moveRight = ({ id }) => {
  const state = store.get();

  state.users[id].position.x += 1;
  store.set(state);

  sendUpdate({ data: state });
};

export default moveRight;
