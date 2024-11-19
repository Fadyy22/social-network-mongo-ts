import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export const initializeSocket = (server: HTTPServer) => {
  io = new Server(server);

  // When a user connects, add an event listener for the emitted event "joinRoom"
  // and make the user join a room with his id
  io.on('connection', (socket) => {
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
