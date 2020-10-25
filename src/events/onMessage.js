import moveUp from '../actions/moveUp';
import moveDown from '../actions/moveDown';
import moveLeft from '../actions/moveLeft';
import moveRight from '../actions/moveRight';
import login from '../actions/login';

const onMessage = ({ id, message }) => {
  const req = JSON.parse(message.utf8Data);
  const { action, params } = req;

  switch (action) {
    case 'login':
      console.log('HIT');
      return login({ id, params });
    case 'moveUp':
      return moveUp({ id });
    case 'moveLeft':
      return moveLeft({ id });
    case 'moveRight':
      return moveRight({ id });
    case 'moveDown':
      return moveDown({ id });
    default:
      return false;
  }
};

export default onMessage;
