import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'fintech_secret_key_256bit' 
const JWT_SECRET = 'your_jwt_secret_key_here' 

const user = {
  email: 'pragati@fintech.com',
  password: 'Pragati@1997', 
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, encryptedPassword } = req.body

  if (!email || !encryptedPassword) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY)
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)

  if (email === user.email && decryptedPassword === user.password) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' })

    return res.status(200).json({ token })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}
