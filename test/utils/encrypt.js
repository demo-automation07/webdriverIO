// utils/encrypt.js
import crypto from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
const projectRoot = process.cwd();
dotenv.config({ path: path.join(projectRoot, '../.env') })
const algorithm = 'aes-256-cbc'; // AES encryption algorithm
const secretKey = process.env.SECRET_KEY; // Encryption key (preferably from environment variables)
const iv = crypto.randomBytes(16); // Random initialization vector (IV) for encryption

/**
 * Encrypts the password using AES-256-CBC encryption algorithm.
 * @param {string} password - The plain password to encrypt.
 * @returns {Object} The encrypted password and the IV used for encryption.
 */
export function encryptPassword(password) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey,'hex'), iv);
    let encrypted = cipher.update(password);
    encrypted += cipher.final('hex');

    // Return both the encrypted password and the IV used
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

/**
 * Saves the encrypted password to a JSON file.
 * @param {Object} encryptedData - The encrypted password and IV to store.
 * @param {string} filePath - The path to the JSON file.
 */
export function saveEncryptedPasswordToFile(encryptedData, filePath) {
    // Convert data to JSON format and write to file
    fs.writeFileSync(filePath, JSON.stringify(encryptedData, null, 2), 'utf-8');
    console.log(`Encrypted password saved to ${filePath}`);
}

/**
 * Reads the encrypted password from the JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Object} The data containing the encrypted password and IV.
 */
export function readEncryptedPasswordFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Decrypts the encrypted password using AES-256-CBC encryption algorithm.
 * @param {string} encryptedData - The encrypted password.
 * @param {string} iv - The initialization vector used for encryption.
 * @returns {string} The decrypted plain password.
 */
export function decryptPassword(encryptedData, iv) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey,'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}