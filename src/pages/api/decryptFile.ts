import { decryptFile } from '../../utils/decrypt';

// Definir tipos para 'req' e 'res' corretamente
export default async function handler(req: any, res: any) {
  try {
    const decryptedData = await decryptFile();
    res.status(200).json(decryptedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrypt the file.' });
  }
}