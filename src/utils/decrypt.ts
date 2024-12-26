import * as CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import axios from 'axios';  // Importa o axios para fazer a requisição HTTP

// Carregar variáveis de ambiente
dotenv.config();

const secretKey = process.env.ENCRYPTION_KEY || ''; // chave de acesso
const iv = process.env.ENCRYPTION_IV || ''; // IV

// URL do arquivo criptografado remoto
const fileUrl = 'https://gist.githubusercontent.com/naysaralodi/9b694242b3a521be2a04ce462761c6da/raw/ffec80752d4fe5fede80a3b549526aa1be1d05e6/encrypted_file.json';

export const decryptFile = async () => {
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

    return decryptedData;
  } catch (error) {
    console.error('Erro ao obter ou decriptografar o arquivo:', error);
  }
};