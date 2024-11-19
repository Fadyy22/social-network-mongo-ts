import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DATABASE_URI as string);
    console.log(`Connected to DB ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error connecting to DB ${err}`);
    process.exit(1);
  }
};

export default connectDB;
