import level0 from './levels/0';

const initialState = {
  connections: {},
  levels: {
    0: level0,
  },
  users: {},
  utils: {
    salt: '',
  },
};

export default initialState;
