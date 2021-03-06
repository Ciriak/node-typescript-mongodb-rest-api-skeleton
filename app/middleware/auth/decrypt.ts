import crypto from 'crypto';

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error('MISSING JWT_SECRET');
  process.exit(1);
}

const algorithm = 'aes-256-cbc';
// Key length is dependent on the algorithm. In this case for aes256, it is
// 32 bytes (256 bits).
const key = crypto.scryptSync(secret, 'salt', 32);
const iv = Buffer.alloc(16, 0); // Initialization crypto vector

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */
const decrypt = (text: string): string => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return err;
  }
};

export default decrypt;
