// Importar los módulos necesarios
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import qs from 'qs';

// Configurar la aplicación Express
const app = express();
const port = 3000;
app.use(cors()); // Puedes cambiar el puerto según tus necesidades

// Middleware para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar la solicitud POST
app.post('/template', async (req: Request, res: Response) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const {
      languageCode,
      content,
      category,
      templateType,
      elementName,
      exampleHeader,
      example,
      vertical,
    } = req.body;

    // Configurar los datos para la solicitud a la API externa
    const requestData = {
      languageCode,
      content,
      category,
      templateType,
      elementName,
      exampleHeader,
      example,
      vertical,
    };
    
    console.log(req.body);
    const requestBody = qs.stringify(requestData);
    
    // Realizar la solicitud a la API externa utilizando Axios
    const apiResponse = await axios.post(
      'https://api.gupshup.io/wa/app/e16ef554-0930-4b6e-88bd-6e948ce5f78a/template',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': 'bbcms7lbqmxe70qy89kj1jxcfmnjfaze'
        }
      }
    );
  
    res.json(200),(apiResponse.data)

  } catch (error) {
    console.error('Error al realizar la solicitud a la API externa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
