//run only once to generate secret key
import crypto from 'crypto';

// Generate a random 256-bit (32 bytes) secret key
const secretKey = crypto.randomBytes(32).toString('hex'); // or 'base64' for base64 encoding

console.log(secretKey); 