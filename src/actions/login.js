import * as bcrypt from 'bcrypt';
import store from '../constants/store';
import sendUpdate from './sendUpdate';

const { uuid } = require('uuidv4');

const login = ({ id, params }) => {
  const state = store.get();
  const { password, username } = params;
  const existingUser = state.users.find(
    (obj) => obj.username.toLowerCase() === username.toLowerCase(),
  );
  console.log(id, username, password);
  if (existingUser) {
    // if (checkCredentials()) {
    // }
  } else {
    const userId = uuid();
    const user = {
      id: userId,
      password: bcrypt.hashSync(password, state.utils.salt),
      position: {
        x: 0,
        y: 0,
      },
      username,
    };
    state.connections[id].userId = userId;
    state.users[userId] = user;
    store.set(state);
    sendUpdate({ data: user });
  }
};

export default login;
