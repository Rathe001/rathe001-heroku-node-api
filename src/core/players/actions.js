const actions = {
  ADD: 'PLAYERS_ADD',
  MOVE_DOWN: 'PLAYERS_MOVE_DOWN',
  MOVE_LEFT: 'PLAYERS_MOVE_LEFT',
  MOVE_RIGHT: 'PLAYERS_MOVE_RIGHT',
  MOVE_UP: 'PLAYERS_MOVE_UP',
  REMOVE: 'PLAYERS_REMOVE',

  add: (payload) => ({
    payload,
    type: actions.ADD,
  }),

  moveDown: (payload) => ({
    payload,
    type: actions.MOVE_DOWN,
  }),

  moveLeft: (payload) => ({
    payload,
    type: actions.MOVE_LEFT,
  }),

  moveRight: (payload) => ({
    payload,
    type: actions.MOVE_RIGHT,
  }),

  moveUp: (payload) => ({
    payload,
    type: actions.MOVE_UP,
  }),

  remove: (payload) => ({
    payload,
    type: actions.REMOVE,
  })
};

export default actions;
