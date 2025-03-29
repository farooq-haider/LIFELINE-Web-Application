import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        port: Number(process.env.DB_PORT) || 5432,
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        url: process.env.DB_CONNECTION_STRING
    },
    togetherAI: {
        apiKey: process.env.TOGETHER_API_KEY
    },
    JWT_SECRET: process.env.JWT_SECRET as string
}

export default config;