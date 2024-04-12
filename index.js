import './src/config/dotenv.config.js'
import app from './src/config/express.config.js'
import { verifyDbConnection } from './src/config/db.config.js';
import { verifyTransporterConnection } from './src/config/nodemailer.config.js';
import http from 'http';
import { Server as SocketIo } from 'socket.io';
import path from 'path';

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

const PORT1 = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new socketIo(server);

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
server.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT1}`);
});
