// import express, { Router, Request, Response } from 'express';
// import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { getContactsFromDatabase } from '../models/contactModel';
// import { ImageMessage } from '../types';

// const router: Router = express.Router();

// router.post('/enviar-campana', async (req: Request, res: Response) => {
//   try {
//     const imageMessage: ImageMessage = {
//       type: 'image',
//       originalUrl: 'https://www.ejemplo.com/ruta/de/tu/imagen.jpg', // Reemplaza con la URL de tu imagen
//       previewUrl: 'https://www.ejemplo.com/ruta/de/tu/imagen.jpg',
//       caption: 'Descripción de la imagen',
//     };

//     const phoneNumbers: string[] = await getContactsFromDatabase();

//     const sendMessage = async (phoneNumber: string) => {
//       const messageData = {
//         ...imageMessage,
//         phoneNumber,
//       };

//       const encodedParamsForCampaign = new URLSearchParams();
//       encodedParamsForCampaign.set('message', JSON.stringify(messageData));
//       encodedParamsForCampaign.set('channel', 'whatsapp');
//       encodedParamsForCampaign.set('source', '573154288560');
//       encodedParamsForCampaign.set('destination', phoneNumber);

//       const optionsForCampaign: AxiosRequestConfig = {
//         method: 'POST',
//         url: 'https://api.gupshup.io/sm/api/v1/msg',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'apikey': process.env.API_KEY || '',
//         },
//         data: encodedParamsForCampaign,
//       };

//       try {
//         const response = await axios(optionsForCampaign);
//         console.log(response.data);
//       } catch (error) {
//         console.error(`Error al enviar el mensaje a ${phoneNumber}:`, (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
//         console.log('Detalles del error:', error);
//       }
//     };

//     // Enviar mensajes de manera concurrente usando Promise.all
//     await Promise.all(phoneNumbers.map(sendMessage));

//     res.send('Mensajes de la campaña enviados con éxito');
//   } catch (error) {
//     console.error('Error al procesar la campaña:', error);
//     res.status(500).send('Error al procesar la campaña');
//   }
// });

// export default router;