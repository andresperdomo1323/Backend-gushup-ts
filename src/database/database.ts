import mongoose, { Mongoose } from 'mongoose';

let mongooseInstance: Mongoose | null = null;

const connectToDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || '';
  try {
    mongooseInstance = await mongoose.connect(uri);
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};


export { connectToDatabase, mongooseInstance };
