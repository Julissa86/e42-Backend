import "dotenv/config";
import { connect } from 'mongoose';

const NODE_ENV = process.env.NODE_ENV;

async function dbConnect(): Promise<void> {
    const NODE_ENV = process.env.NODE_ENV as string;
    await connect(NODE_ENV);
}

export default dbConnect;