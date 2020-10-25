import store from '../constants/store';
import sendUpdate from '../actions/sendUpdate';

const onClose = ({ description, id, reasonCode }) => {
  const state = store.get();
  delete state.users[id];
  store.set(state);
  console.log(`${id} disconnected.`);
  sendUpdate({ data: state });
};

export default onClose;
