import actions from "./actions";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case actions.MOVE_UP:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          position: {
            ...state[action.payload.id].position,
            y: state[action.payload.id].position.y + 1,
          }
        }
      };
    case actions.MOVE_DOWN:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          position: {
            ...state[action.payload.id].position,
            y: state[action.payload.id].position.y - 1,
          }
        }
      };
    case actions.MOVE_RIGHT:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          position: {
            ...state[action.payload.id].position,
            x: state[action.payload.id].position.x + 1,
          }
        }
      };
    case actions.MOVE_LEFT:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          position: {
            ...state[action.payload.id].position,
            x: state[action.payload.id].position.x - 1,
          }
        }
      };
    case actions.REMOVE:
      const { [action.payload.id]: player, ...restPlayers } = state;
      return restPlayers;

    default:
      return state;
  }
};

export default reducer;
