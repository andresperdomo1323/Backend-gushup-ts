import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/database';
import campaignRoutes from './routes/campaignRoutes';
import messageRoutes from './routes/messageRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/campaign', campaignRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

connectToDatabase();

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});