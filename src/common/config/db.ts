import { connect, connection } from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.DATABASE_URI as string);
    console.log(`Connected to DB ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error connecting to DB ${err}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await connection.close();
    console.log('Disconnected from DB');
  } catch (err) {
    console.log(`Error disconnecting from DB ${err}`);
    process.exit(1);
  }
};
