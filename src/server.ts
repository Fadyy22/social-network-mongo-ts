import { createServer } from 'http';

import { initializeSocket } from './sockets/init';
import app from './app';

const server = createServer(app);

initializeSocket(server);

server.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});

export default server;
