import express from 'express'
import { generateToken } from './auth/jwsUtils.js'
import { authenticate } from './auth/middlewareAuth.js'

const app = express()

app.use(express.json())

app.post('/api/login', (req, res) => {
  const { username } = req.body

  const token = generateToken({ username })

  res.json({
    access_token: token, // process.env.AUTH_TOKEN
    token_type: 'Bearer',
    expires_in: 3600 // 1h - proccess.env.EXPIRES_IN
  })
})

app.get('/api/private', authenticate, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user })
})

app.listen(3000, () => console.log('Server on port 3000'))
