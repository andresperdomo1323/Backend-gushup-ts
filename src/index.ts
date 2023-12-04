// Importar los módulos necesarios
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import multer from 'multer';

// Configurar la aplicación Express
const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

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

    // Realizar la solicitud a la API externa utilizando Axios
    const apiResponse = await axios.post(
      'https://api.gupshup.io/wa/app/e16ef554-0930-4b6e-88bd-6e948ce5f78a/template',
      requestData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': 'bbcms7lbqmxe70qy89kj1jxcfmnjfaze',
        },
      }
    );

    // Enviar la respuesta de la API externa al cliente
    res.json(apiResponse.data);

    if(apiResponse.data.status == 200){
      const front = await axios.get('');
      res.status(200).json({ mensaje: 'Solicitud exitosa' });
    } else {
      res.status(500).json({ mensaje: 'Error en la primera solicitud' });
    }

  } catch (error) {
    console.error('Error al realizar la solicitud a la API externa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor


// Configuración de Multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('archivo'), async (req: Request, res: Response) => {
  try {
    // Acceder al archivo binario desde req.file.buffer
    const archivoBinario = req.file?.buffer;

    // Realizar la solicitud POST al otro servidor usando Axios
    const response = await axios.post('https://api.gupshup.io/wa/e16ef554-0930-4b6e-88bd-6e948ce5f78a/wa/media', archivoBinario, {
      headers: {
        'Content-Type': 'application/octet-stream', // Tipo de contenido para archivos binarios
      },
    });

    // Manejar la respuesta del servidor
    res.json({ success: true, response: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.post('/templateImage', async (req: Request, res: Response) => {
  try {
    
    const {
      languageCode,
      content,
      category,
      templateType,
      elementName,
      media,
      exampleMedia,
      example,
      vertical,
    } = req.body;

    const requestData = {
      languageCode,
      content,
      category,
      templateType,
      elementName,
      media,
      exampleMedia,
      example,
      vertical,
    };

    const apiResponse = await axios.post(
      'https://api.gupshup.io/wa/app/e16ef554-0930-4b6e-88bd-6e948ce5f78a/template',
      requestData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': 'bbcms7lbqmxe70qy89kj1jxcfmnjfaze',
        },
      }
    );

    res.json(apiResponse.data);

  } catch (error) {
    console.error('Error al realizar la solicitud a la API externa:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});