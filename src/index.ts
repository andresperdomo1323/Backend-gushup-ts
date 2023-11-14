import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});

app.post('/enviar-mensaje', async (req: Request, res: Response) => {
  try {
    const messageType = req.body.type;
    let messageData;

    if (messageType === 'text') {
      messageData = {
        type: 'text',
        text: 'Hola usuario, ¿cómo estás?',
      };
    } else if (messageType === 'image') {
      messageData = {
        type: 'image',
        originalUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
        previewUrl: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
        caption: 'Sample image',
      };
    } else if (messageType === 'file') {
      messageData = {
        type: 'file',
        url: 'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf',
        filename: 'Sample file',
      };
    } else if (messageType === 'audio') {
      messageData = {
        type: 'audio',
        url: 'https://www.buildquickbots.com/whatsapp/media/sample/audio/sample02.mp3',
      };
    } else if (messageType === 'video') {
      messageData = {
        type: 'video',
        url: 'https://www.buildquickbots.com/whatsapp/media/sample/video/sample01.mp4',
      };
    } else if (messageType === 'sticker') {
      messageData = {
        type: 'sticker',
        url: 'http://www.buildquickbots.com/whatsapp/stickers/SampleSticker01.webp',
      };
    } else if (messageType === 'list') {
      messageData = {
        "type":"list",
        "title":"title text",
        "body":"body text",
        "msgid":"list1",
        "globalButtons":[
           {
              "type":"text",
              "title":"Global button"
           }
        ],
        "items":[
           {
              "title":"first Section",
              "subtitle":"first Subtitle",
              "options":[
                 {
                    "type":"text",
                    "title":"section 1 row 1",
                    "description":"first row of first section description",
                    "postbackText":"section 1 row 1 postback payload"
                 },
                 {
                    "type":"text",
                    "title":"section 1 row 2",
                    "description":"second row of first section description",
                    "postbackText":"section 1 row 2 postback payload"
                 },
                 {
                    "type":"text",
                    "title":"section 1 row 3",
                    "description":"third row of first section description",
                    "postbackText":"section 1 row 3 postback payload"
                 }
              ]
           },
           {
              "title":"second section",
              "subtitle":"second Subtitle",
              "options":[
                 {
                    "type":"text",
                    "title":"section 2 row 1",
                    "description":"first row of second section description",
                    "postbackText":"section 1 row 3 postback payload"
                 }
              ]
           }
        ]
     };
    } else if (messageType === 'quick_reply') {
      messageData = {
        "type":"quick_reply",
        "msgid":"qr1",
        "content":{
           "type":"text",
           "header":"this is the header",
           "text":"this is the body",
           "caption":"this is the footer"
        },
        "options":[
           {
              "type":"text",
              "title":"First",
              "postbackText": "dev-defined-postback1"
           },
           {
              "type":"text",
              "title":"Second",
              "postbackText": "dev-defined-postback2"
           },
           {
              "type":"text",
              "title":"Third",
              "postbackText": "dev-defined-postback3"
           }
        ]
     };
    } 

    const encodedParams = new URLSearchParams();
    encodedParams.set('message', JSON.stringify(messageData));
    encodedParams.set('channel', 'whatsapp');
    encodedParams.set('source', '573154288560');
    encodedParams.set('destination', '573203120084');

    const options = {
      method: 'POST',
      url: 'https://api.gupshup.io/sm/api/v1/msg',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey': 'bbcms7lbqmxe70qy89kj1jxcfmnjfaze',
      },
      data: encodedParams,
    };

    const response = await axios(options);

    console.log(response.data);

    res.send('Mensaje enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el mensaje:', (error as AxiosError).response ? (error as AxiosError).response?.data : (error as any).message);
    
    console.log('Detalles del error:', error);

    res.status(500).send('Error al enviar el mensaje');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
