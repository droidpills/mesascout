import { decryptFile } from '../../utils/decrypt';

export default async function handler(req, res) {
  try {
    const decryptedData = await decryptFile();
    res.status(200).json(decryptedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrypt the file.' });
  }
}