// import express, { Request, Response } from 'express';
// import axios, { AxiosError } from 'axios';

// const app = express();
// const port = 3000;

// app.use(express.json());

// // Ruta principal
// app.get('/', (req: Request, res: Response) => {
//   res.send('¡Hola, mundo!');
// });

// // Ruta para enviar mensajes
// app.post('/enviar-mensaje', async (req: Request, res: Response) => {
//   try {
//     // Tipo de mensaje enviado desde el cliente
//     const messageType = req.body.type;
//     let messageData;

//     // Configuración de datos del mensaje según el tipo
//     if (messageType === 'text') {
//       messageData = {
//         type: 'text',
//         text: 'Hola usuario, ¿cómo estás?',
//       };
//     } else if (messageType === 'image') {
//       messageData = {
//         type: 'image',
//         originalUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
//         previewUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
//         caption: 'Sample image',
//       };
//     } else if (messageType === 'file') {

//     }

//     // Parámetros codificados para la solicitud a la API de Gupshup
//     const encodedParams = new URLSearchParams();
//     encodedParams.set('message', JSON.stringify(messageData));
//     encodedParams.set('channel', 'whatsapp');
//     encodedParams.set('source', '573154288560');
//     encodedParams.set('destination', '573203120084');

//     // Opciones para la solicitud HTTP
//     const options = {
//       method: 'POST',
//       url: 'https://api.gupshup.io/sm/api/v1/msg',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'apikey': 'bbcms7lbqmxe70qy89kj1jxcfmnjfaze',
//       },
//       data: encodedParams,
//     };

//     // Realizar la solicitud a la API de Gupshup
//     const response = await axios(options);

//     // Registro de la respuesta de la API
//     console.log(response.data);

//     // Enviar respuesta al cliente
//     res.send('Mensaje enviado con éxito');
//   } catch (error) {
//     // Manejo de errores
//     console.error('Error al enviar el mensaje:', (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
//     console.log('Detalles del error:', error);

//     // Enviar respuesta de error al cliente
//     res.status(500).send('Error al enviar el mensaje');
//   }
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor escuchando en el puerto ${port}`);
// });

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

