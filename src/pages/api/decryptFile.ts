import { decryptFile } from '../../utils/decrypt';

const handler = async (req, res) => {
  const decryptedData = await decryptFile();
  res.status(200).json(decryptedData);
};

export default handler;