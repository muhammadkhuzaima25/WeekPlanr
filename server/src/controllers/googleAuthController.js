import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' })
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name, picture, sub: googleId } = payload

    let user = await User.findOne({ email })

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId
        user.avatar = picture || user.avatar
        await user.save()
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
      })
    }

    const token = signToken(user._id)
    res.json({ token, user })
  } catch (err) {
    console.error('Google auth error:', err.message)
    res.status(401).json({ message: 'Google authentication failed' })
  }
}
