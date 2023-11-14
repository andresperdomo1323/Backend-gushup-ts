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

    const encodedParams = new URLSearchParams();
    encodedParams.set('message', 'prueba');
    encodedParams.set('channel', 'whatsapp');
    encodedParams.set('source', '573154288560');
    encodedParams.set('destination', '573014558248');

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
