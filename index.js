import './src/config/dotenv.config.js'
import app from './src/config/express.config.js'
import { verifyDbConnection } from './src/config/db.config.js';
import { verifyTransporterConnection } from './src/config/nodemailer.config.js';

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
