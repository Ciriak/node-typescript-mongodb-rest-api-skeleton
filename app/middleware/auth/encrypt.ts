import crypto from "crypto";

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("MISSING JWT_SECRET");
  process.exit(1);
}

const algorithm = "aes-256-cbc";
// Key length is dependent on the algorithm. In this case for aes256, it is
// 32 bytes (256 bits).
const key = crypto.scryptSync(secret, "salt", 32);
const iv = Buffer.alloc(16, 0); // Initialization crypto vector

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

export default encrypt;
