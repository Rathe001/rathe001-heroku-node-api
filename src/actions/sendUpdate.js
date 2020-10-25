import store from '../constants/store';

const cleanData = (data) => ({
  users: data.users,
});

const sendUpdate = ({ data, ids }) => {
  const { connections } = store.get();
  const cleaned = cleanData(data);

  if (ids) {
    ids.forEach((id) => users[id].connection.sendUTF(JSON.stringify(data)));
  } else {
    Object.keys(connections).forEach((id) =>
      connections[id].connection.sendUTF(JSON.stringify(cleaned)),
    );
  }
};

export default sendUpdate;
