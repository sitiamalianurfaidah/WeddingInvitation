const mongoose = require('mongoose');
let mongoClient = null;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connected to MongoDB with Mongoose"); 
        
        mongoClient = mongoose.connection.getClient();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

const getMongoClient = () => {
    if (!mongoClient) {
        throw new Error("MongoDB client not initialized. Call connectDB() first.");
    }
    return mongoClient;
};

module.exports = { connectDB, getMongoClient };

