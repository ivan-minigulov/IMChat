export {}
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/User')

class TokenService {
  generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '24h',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '24h',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  generateAccessTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '24h',
    })
    return {
      accessToken,
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(username: string, refreshToken: string) {
    await UserModel.updateOne(
      { username: username },
      { refreshToken: refreshToken }
    ).exec()
    return
  }

  async removeToken(refreshToken: string) {
    await UserModel.updateOne({ refreshToken }, { refreshToken: '' }).exec()
    return
  }

  // async findToken(userId: string, refreshToken: string) {
  //   const tokenData = await UserModel.findById({ userId })
  //   return tokenData
  // }
}

module.exports = new TokenService()
