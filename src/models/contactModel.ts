import mongoose, { Document, Schema } from 'mongoose';

interface Contact {
  user: string;
  phoneNumber: string;
}

interface ContactDocument extends Contact, Document {}

const contactSchema = new Schema<ContactDocument>({
  user: { type: String, index: true },
  phoneNumber: { type: String, unique: true },
});

const ContactModel = mongoose.model<ContactDocument>('campaing', contactSchema);

const getContactsFromDatabase = async (): Promise<string[]> => {
  try {
    const contacts = await ContactModel.find({}, 'phoneNumber');

    const phoneNumbers = contacts.map((contact) => contact.phoneNumber as string);

    console.log('Números de teléfono obtenidos de la base de datos:', phoneNumbers);

    return phoneNumbers;
  } catch (error) {
    console.error('Error al obtener contactos de la base de datos:', error);
    throw error;
  }
};

export { ContactModel, getContactsFromDatabase };
