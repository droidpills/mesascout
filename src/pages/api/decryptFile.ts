import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import axios from 'axios'; // Importação do axios para requisição HTTP
import type { NextApiRequest, NextApiResponse } from 'next';

// Carregar variáveis de ambiente
dotenv.config();

const secretKey = process.env.ENCRYPTION_KEY || ''; // Chave de acesso
const iv = process.env.ENCRYPTION_IV || ''; // IV

// URL do arquivo criptografado remoto
const fileUrl = 'https://gist.githubusercontent.com/naysaralodi/9b694242b3a521be2a04ce462761c6da/raw/ffec80752d4fe5fede80a3b549526aa1be1d05e6/encrypted_file.json';

// Definição do tipo para req e res usando NextApiRequest e NextApiResponse
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fazer a requisição para obter o conteúdo do arquivo remoto
    const { data: encryptedData } = await axios.get(fileUrl);
    
    // Decriptografar os dados
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      CryptoJS.enc.Base64.parse(secretKey),
      { iv: CryptoJS.enc.Base64.parse(iv) }
    );

    // Parsear o JSON
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    res.status(200).json(decryptedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrypt the file.' });
  }
}