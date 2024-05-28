import mongoose from 'mongoose';
import express from 'express';
import apiRegister from './apiRegister.js';

const server = express();
const port = 3002;

server.use(express.json());

const dbURI = 'mongodb+srv://unlgrsel:gursel1234@cluster0.hl9pkld.mongodb.net/FitnessTracker-Gursel?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  serverSelectionTimeoutMS: 5000, // 5 saniye sonra zaman aşımı
  socketTimeoutMS: 45000, // Soket zaman aşımı
}).then(() => {
  console.log('Connected to MongoDB');
  // Sadece MongoDB'ye bağlandıktan sonra API'yi kaydettiriyoruz
  apiRegister(server, mongoose);
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
