import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dataBaseUri: string = process.env.DB_URI as string
        await mongoose.connect(dataBaseUri);
        console.log('Data Base connected')
    } catch (error) {
        console.log(error)
    }
};

export default connectDB
