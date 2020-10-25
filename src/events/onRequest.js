import onConnect from './onConnect';

const originIsAllowed = (origin) => {
  const allowed = ['http://www.astigmapro.com', 'http://localhost:3000'];

  return allowed.includes(origin);
};

const onRequest = ({ request }) => {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(`Request from ${request.origin} rejected.`);
    return;
  }

  onConnect({ request });
};

export default onRequest;
