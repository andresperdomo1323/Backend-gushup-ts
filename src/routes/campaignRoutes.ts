import express, { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { getContactsFromDatabase } from '../models/contactModel';
import { TextMessage } from '../types';

const router: Router = express.Router();

router.post('/enviar-campana', async (req: Request, res: Response) => {
  try {
    const textMessage: TextMessage = {
      type: 'text',
      text: '¡Hola! Este es un mensaje de la campaña.',
      image: {
        type: '',
        originalUrl: '',
        previewUrl: '',
        caption: ''
      }
    };

    const phoneNumbers: string[] = await getContactsFromDatabase();

    for (const phoneNumber of phoneNumbers) {
      const messageData = {
        ...textMessage,
        type: 'text',
        text: `¡Hola! Este es un mensaje de la campaña para ${phoneNumber}.`,
        phoneNumber,
      };

      const encodedParamsForCampaign = new URLSearchParams();
      encodedParamsForCampaign.set('message', JSON.stringify(messageData));
      encodedParamsForCampaign.set('channel', 'whatsapp');
      encodedParamsForCampaign.set('source', '573154288560');
      encodedParamsForCampaign.set('destination', phoneNumber);

      const optionsForCampaign = {
        method: 'POST',
        url: 'https://api.gupshup.io/sm/api/v1/msg',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': process.env.API_KEY,
        },
        data: encodedParamsForCampaign,
      };

      try {
        const response = await axios(optionsForCampaign);
        console.log(response.data);
      } catch (error) {
        console.error('Error al enviar el mensaje:', (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
        console.log('Detalles del error:', error);
      }
    }

    res.send('Mensajes de la campaña enviados con éxito');
  } catch (error) {
    console.error('Error al procesar la campaña:', error);
    res.status(500).send('Error al procesar la campaña');
  }
});

export default router;
