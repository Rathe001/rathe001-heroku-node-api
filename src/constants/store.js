import initialState from './initialState';

const store = {
  get: () => store.value,
  set: (val) => {
    store.value = val;
  },
  value: {
    ...initialState,
  },
};

export default store;
