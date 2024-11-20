//(Run this once to encrypt the password and save it)
import { encryptPassword, saveEncryptedPasswordToFile } from './encrypt.js';

// Password to encrypt
const password = 'Password123';

// Encrypt the password
const encryptedPassword = encryptPassword(password);

// Save the encrypted password and IV to a JSON file
const filePath = './test/data/encryptedPassword.json';
saveEncryptedPasswordToFile(encryptedPassword, filePath);