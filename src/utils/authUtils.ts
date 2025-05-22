import CryptoJS from 'crypto-js'

const SECRET_KEY = 'fintech_secret_key_256bit' 

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString()
}

export const decryptPassword = (encrypted: string): string => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
  const decrypted = bytes.toString(CryptoJS.enc.Utf8)
  return decrypted
}
