// // import express from 'express';
// // import dotenv from 'dotenv';
// // import { connectToDatabase } from './database/database';
// // import campaignRoutes from './routes/campaignRoutes';
// // import messageRoutes from './routes/messageRoutes';

// // dotenv.config();
// // const app = express();
// // const port = process.env.PORT || 3000;

// // app.use(express.json());
// // app.use('/api/campaign', campaignRoutes);
// // app.use('/api/message', messageRoutes);

// // app.get('/', (req, res) => {
// //   res.send('¡Hola, mundo!');
// // });

// // connectToDatabase().then(() => {
// //   app.listen(port, () => {
// //     console.log(`Servidor escuchando en el puerto ${port}`);
// //   });
// // }).catch(error => {
// //   console.error('Error al conectar a la base de datos:', error);
// //   process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
// // });



// import express, { Router, Request, Response } from 'express';
// import axios, { AxiosError } from 'axios';
// import { getContactsFromDatabase } from '../models/contactModel';
// import { TextMessage } from '../types';

// const router: Router = express.Router();

// router.post('/enviar-campana', async (req: Request, res: Response) => {
//   try {
//     // Obtén el tipo de mensaje, el texto y la URL de la imagen del cuerpo de la solicitud
//     const messageType: string = req.body.type;
//     const text: string = req.body.text;
//     const imageUrl: string = req.body.imageUrl;

//     // Verifica si la URL de la imagen está presente
//     if (!imageUrl) {
//       throw new Error('https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg');
//     }

//     // Verifica el tipo de mensaje y crea el objeto de mensaje correspondiente
//     let messageData: TextMessage;
//     if (messageType === 'text' && text) {
//       messageData = {
//         type: 'text',
//         text: text,
//       };
//     } else {
//       throw new Error('Tipo de mensaje no válido o texto no proporcionado.');
//     }

//     // Agrega información de la imagen al mensaje de texto
//     messageData.image = {
//       type: 'image',
//       originalUrl: imageUrl,
//       previewUrl: imageUrl,
//       caption: 'Descripción de la imagen',
//     };

//     const phoneNumbers: string[] = await getContactsFromDatabase();

//     for (const phoneNumber of phoneNumbers) {
//       // Agrega el número de teléfono a los datos del mensaje
//       const completeMessageData = {
//         ...messageData,
//         phoneNumber,
//       };

//       const encodedParamsForCampaign = new URLSearchParams();
//       encodedParamsForCampaign.set('message', JSON.stringify(completeMessageData));
//       encodedParamsForCampaign.set('channel', 'whatsapp');
//       encodedParamsForCampaign.set('source', '573154288560');
//       encodedParamsForCampaign.set('destination', phoneNumber);

//       const optionsForCampaign = {
//         method: 'POST',
//         url: 'https://api.gupshup.io/sm/api/v1/msg',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'apikey': process.env.API_KEY,
//         },
//         data: encodedParamsForCampaign,
//       };

//       try {
//         const response = await axios(optionsForCampaign);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error al enviar el mensaje:', (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
//         console.log('Detalles del error:', error);
//       }
//     }

//     res.send('Mensajes de la campaña enviados con éxito');
//   } catch (error) {
//     console.error('Error al procesar la campaña:', error.message);
//     res.status(500).send('Error al procesar la campaña');
//   }
// });

// export default router;





// import express, { Router, Request, Response } from 'express';
// import axios, { AxiosError } from 'axios';
// import { getContactsFromDatabase } from '../models/contactModel';
// import { TextMessage } from '../types';

// interface ImageTextMessage extends TextMessage {
//   image: {
//     type: 'image';
//     originalUrl: string;
//     previewUrl: string;
//     caption: string;
//   };
// }

// interface CompleteMessageData extends ImageTextMessage {
//   phoneNumber: string;
// }

// const router: Router = express.Router();

// router.post('/enviar-campana', async (req: Request, res: Response) => {
//   try {
//     const messageType: string = req.body.type;
//     const text: string = req.body.text;
//     const imageUrl: string = req.body.imageUrl || 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg';

//     let messageData: ImageTextMessage;

//     if (messageType === 'text' && text) {
//       messageData = {
//         type: 'text',
//         text: text,
//         image: {
//           type: 'image',
//           originalUrl: imageUrl,
//           previewUrl: imageUrl,
//           caption: 'Descripción de la imagen',
//         },
//       };
//     } else {
//       throw new Error('Tipo de mensaje no válido o texto no proporcionado.');
//     }

//     const phoneNumbers: string[] = await getContactsFromDatabase();

//     for (const phoneNumber of phoneNumbers) {
//       const completeMessageData: CompleteMessageData = {
//         ...messageData,
//         phoneNumber,
//       };

//       const encodedParamsForCampaign = new URLSearchParams();
//       encodedParamsForCampaign.set('message', JSON.stringify(completeMessageData));
//       encodedParamsForCampaign.set('channel', 'whatsapp');
//       encodedParamsForCampaign.set('source', '573154288560');
//       encodedParamsForCampaign.set('destination', phoneNumber);

//       const optionsForCampaign = {
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
//       } catch (error: any) {
//         if (error instanceof Error) {
//           console.error('Error al enviar el mensaje:', error.message);
//         } else {
//           console.error('Error al enviar el mensaje:', error);
//         }
//         // No detenemos el bucle si hay un error en un número de teléfono
//       }
//     }

//     // Enviamos la respuesta después de procesar todos los números de teléfono
//     res.send('Mensajes de la campaña enviados con éxito');
//   } catch (error: Error | any) {
//     if (error instanceof Error) {
//       console.error('Error al enviar el mensaje:', error.message);
//     } else {
//       console.error('Error al enviar el mensaje:', error);
//     }
//     res.status(500).send('Error al procesar la campaña');
//   }
// });
  

// export default router;
