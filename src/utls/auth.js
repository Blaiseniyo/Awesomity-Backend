import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
const secret = process.env.TOKEN_SECRET;

/**
   * Generate JWT
   * @param {Object} payload - object literal resource to be encoded
   * @param {String} expiresIn jwt expiry date
   * @returns {String} - jwt token
   */
export const generateToken = (payload, expiresIn = '7d') => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn });
  return token;
};

export const comparePassword = (password, userPassword) => {
  const result = bcrypt.compareSync(password, userPassword);
  return result;
};

/**
 * @function verifyToken
 * @param {String} token jwt token
 * @returns {Object} decoded object
 */
export const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded;
};

// export const verifyToken = async (token) => {
//   const decoded = await jwt.verify(token, process.env.TOKEN_SECRET, (error) => {
//     if (error) {
//       return { messages: ('your token expired') };
//     }
//   });
//   return decoded;
// };

/**
 * @function hashPassword
 * @param {String} password pasword string to be hashed
 * @returns {String} hashed password
 * @description takes a raw password string, hashes it and returns the hasshed value
 */
export const hashPassword = (password) =>{  
    return bcrypt.hashSync(password, salt)
};

export default { generateToken, verifyToken };
