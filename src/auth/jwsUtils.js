import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const generateRandomString = (length = 32) =>
  crypto.randomBytes(length).toString('hex')

const secretKey = generateRandomString()

console.log({ secretKey })

export const generateToken = payload =>
  jwt.sign(payload, secretKey, { expiresIn: '1h' })

export const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, secretKey)

    return decoded
  } catch (error) {
    return null
  }
}
