import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    }
};

if (!config.mongoUri) {
    console.error("CRITICAL ERROR: MONGO_URI is missing in environment variables!");
    process.exit(1);
}

if (!config.jwtSecret) {
    console.error("CRITICAL ERROR: JWT_SECRET is missing in environment variables!");
    process.exit(1);
}

if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    console.error("CRITICAL ERROR: Cloudinary credentials are missing in environment variables!");
    process.exit(1);
}

export default config;
