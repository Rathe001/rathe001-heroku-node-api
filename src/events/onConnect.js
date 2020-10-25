import onMessage from './onMessage';
import onClose from './onClose';
import store from '../constants/store';
import sendUpdate from '../actions/sendUpdate';

const { uuid } = require('uuidv4');

const onConnect = ({ request }) => {
  const id = uuid();
  const connection = request.accept(null, request.origin);
  const state = store.get();

  state.connections[id] = {
    connection,
    userId: id,
  };

  state.users[id] = {
    position: {
      x: 0,
      y: 0,
    },
  };

  store.set(state);
  console.log(`${id} connected.`);
  sendUpdate({ data: state });

  connection.on('message', (message) => {
    onMessage({ id, message });
  });
  connection.on('close', (reasonCode, description) => {
    onClose({ description, id, reasonCode });
  });
};

export default onConnect;
