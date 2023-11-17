import express, { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { getContactsFromDatabase } from '../models/contactModel';
import { TextMessage, ImageMessage, FileMessage, AudioMessage, VideoMessage, StickerMessage, InteractiveListMessage } from '../types';

const router: Router = express.Router();

router.post('/enviar-campana', async (req: Request, res: Response) => {
  try {
    const messageType: string = req.body.type;

    const phoneNumbers: string[] = await getContactsFromDatabase();

    for (const phoneNumber of phoneNumbers) {
      if (messageType === 'text') {
        const textMessageData: TextMessage = {
          type: 'text',
          text: `¡Hola! Este es un mensaje de la campaña para ${phoneNumber}.`,
        };
        await sendMessage(textMessageData, phoneNumber);
      } else if (messageType === 'image') {
        const imageMessageData: ImageMessage = {
          type: 'image',
          originalUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
          previewUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
          caption: `Sample image for ${phoneNumber}`,
        };
        await sendMessage(imageMessageData, phoneNumber);
      } else if (messageType === 'file') {
        const fileMessageData: FileMessage = {
          type: 'file',
          url: 'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf',
          filename: 'Sample file',
        };
        await sendMessage(fileMessageData, phoneNumber);
      } else if (messageType === 'audio') {
        const audioMessageData: AudioMessage = {
          type: 'audio',
          url: 'https://www.buildquickbots.com/whatsapp/media/sample/audio/sample02.mp3',
        };
        await sendMessage(audioMessageData, phoneNumber);
      } else if (messageType === 'video') {
        const videoMessageData: VideoMessage = {
          type: 'video',
          url: 'https://www.buildquickbots.com/whatsapp/media/sample/video/sample01.mp4',
        };
        await sendMessage(videoMessageData, phoneNumber);
      } else if (messageType === 'sticker') {
        const stickerMessageData: StickerMessage = {
          type: 'sticker',
          url: 'http://www.buildquickbots.com/whatsapp/stickers/SampleSticker01.webp',
        };
        await sendMessage(stickerMessageData, phoneNumber);
      } else if (messageType === 'list') {
        const interactiveListMessageData: InteractiveListMessage = {
          type: 'list',
          title: 'title text',
          body: 'body text',
          msgid: 'list1',
          globalButtons: [
            {
              type: 'text',
              title: 'Global button',
            },
          ],
          items: [
            {
              title: 'first Section',
              subtitle: 'first Subtitle',
              options: [
                {
                  type: 'text',
                  title: 'section 1 row 1',
                  description: 'first row of first section description',
                  postbackText: 'section 1 row 1 postback payload',
                },
              ],
            },
            {
              title: 'second section',
              subtitle: 'second Subtitle',
              options: [
                {
                  type: 'text',
                  title: 'section 2 row 1',
                  description: 'first row of second section description',
                  postbackText: 'section 1 row 3 postback payload',
                },
              ],
            },
          ],
        };
        await sendMessage(interactiveListMessageData, phoneNumber);
      }
    }

    res.send('Mensajes de la campaña enviados con éxito');
  } catch (error) {
    console.error('Error al procesar la campaña:', error);
    res.status(500).send('Error al procesar la campaña');
  }
});


async function sendMessage(messageData: TextMessage | ImageMessage | FileMessage | AudioMessage | VideoMessage | StickerMessage | InteractiveListMessage, destination: string): Promise<void> {
  const encodedParams = new URLSearchParams();
  encodedParams.set('message', JSON.stringify(messageData));
  encodedParams.set('channel', 'whatsapp');
  encodedParams.set('source', '573154288560');
  encodedParams.set('destination', destination);

  const options = {
    method: 'POST',
    url: 'https://api.gupshup.io/sm/api/v1/msg',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'apikey': process.env.API_KEY,
    },
    data: encodedParams,
  };

  try {
    const response = await axios(options);
    console.log(response.data);
  } catch (error) {
    console.error('Error al enviar el mensaje:', (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
    console.log('Detalles del error:', error);
  }
}

export default router;
