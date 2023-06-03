import { verifyToken } from './jwsUtils.js'

export const authenticate = (req, res, next) => {
  const authHeaders = req.headers['authorization']

  const token = authHeaders && authHeaders.split(' ')[1]
  const tokenType = authHeaders && authHeaders.split(' ')[0]

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' })

  if (tokenType !== 'Bearer')
    return res.status(401).json({ error: 'Invalid token_type' })

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }

  req.authenticated = true
  req.user = decoded
  next()
}
