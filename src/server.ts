import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3333;

    await app.listen({ port: PORT, host: '0.0.0.0' });

    console.log(`Sever running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
