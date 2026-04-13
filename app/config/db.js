import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

const connectDb = async() => {
    try {
        const uri = process.env.MONGO_URI
        await mongoose.connect(uri)
    } catch (error) {
        console.error("Error al conectar a la base de datos")

        process.exit(1)
    }
}

export default connectDb;