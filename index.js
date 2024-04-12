import './src/config/dotenv.config.js'
import app from './src/config/express.config.js'
import { verifyDbConnection } from './src/config/db.config.js';
import { verifyTransporterConnection } from './src/config/nodemailer.config.js';
import http from 'http';
import { Server as SocketIo } from 'socket.io';

const PORT = 5000 || process.env.PORT;

app.listen(PORT, async () => {
  try {
    await verifyDbConnection();
    console.log('Connected to the database');

    await verifyTransporterConnection();
    console.log('SMTP connection verified! Ready for emails');

    console.log('Server listening on port:', PORT);
  } catch (err) {
    console.error(err.message);
  }
})

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const server = http.createServer(app);
const io = new SocketIo(server);

// Serve static files from the 'public' directory

// Socket.io logic (your existing WebSocket server logic)
io.on('connection', socket => {
  // Handle new user connections, chat messages, and disconnections
  socket.on('new-user', name => {
    // Handle new user event
  });

  socket.on('send-chat-message', message => {
    // Handle chat message event
  });

  socket.on('disconnect', () => {
    // Handle disconnect event
  });
});

// Start the server
server.listen(SOCKET_PORT, () => {
  console.log(`Server is running on port ${SOCKET_PORT}`);
});
