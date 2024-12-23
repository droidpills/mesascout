import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

// Helper function to fetch and decrypt the data
const decryptDataFromUrl = async (url: string, keyBase64: string) => {
  try {
    // Fetch the encrypted data from the Gist URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`);
    }

    const encryptedData = await response.text(); // Fetch raw text

   // console.log("Encrypted Data:", encryptedData); // Debug log the fetched data

    // Decode the Base64 key
    const keyBytes = CryptoJS.enc.Base64.parse(keyBase64);
    console.log("Key Bytes:", keyBytes.toString()); // Debug log the key bytes

    // Decrypt the data using AES
    const bytes = CryptoJS.AES.decrypt(encryptedData, keyBytes.toString(CryptoJS.enc.Utf8));
    console.log("Decrypted Bytes:", bytes.toString(CryptoJS.enc.Hex)); // Debug log raw decrypted bytes

    // Convert decrypted bytes to a UTF-8 string
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Decryption resulted in empty data.");

    // Parse the decrypted data as JSON
    const jsonData = JSON.parse(decrypted);
    return jsonData;
  } catch (error) {
    console.error("Decryption Error:", error.message); // Debug log errors
    throw new Error("Failed to decrypt data: " + error.message);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Gist URL
    const gistUrl =
      "https://gist.githubusercontent.com/droidpills/22e076635667117fb8edd50aec9224b3/raw/855f4b42a85ec12820e793ddff35925824252c99/data3.enc";

    // Load the encryption key from environment variables
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    if (!encryptionKey) {
      throw new Error("Encryption key not found in environment variables.");
    }

    console.log("Encryption Key:", encryptionKey); // Debug log the encryption key

    // Decrypt the data from the Gist URL
    const decryptedData = await decryptDataFromUrl(gistUrl, encryptionKey);

    // Return the decrypted data as JSON
    res.status(200).json(decryptedData);
  } catch (error) {
    console.error("Handler Error:", error.message); // Debug log errors
    res.status(500).json({ error: error.message });
  }
}