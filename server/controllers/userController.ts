import { Request, Response } from 'express'
const userService = require('../serviceModels/userService')
const { UserModel } = require('../models/User')
const ApiError = require('../middelware/ApiError')
const tokenService = require('../serviceModels/tokenService')
const bcrypt = require('bcrypt')

class UserController {
  async registration(req: Request, res: Response, next: Function) {
    try {
      const { username, password } = req.body
      const candidate = await UserModel.findOne({ username }).exec()
      if (candidate) {
        throw ApiError.BadRequest(`Username ${username} уже занят`)
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await userService.registration(username, hashPassword)
      const userDto = {
        username: user._doc.username,
        profilePicture: user._doc.profilePicture,
        followers: user._doc.followers,
      }
      const tokens = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(userDto.username, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.status(200).json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: Function) {
    try {
      const { username, password } = req.body
      const user = await UserModel.findOne({ username }).exec()
      if (!user) {
        throw ApiError.BadRequest(`Пользователь ${username} не найден`)
      }
      const isPassEquals = await bcrypt.compare(password, user._doc.password)
      if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль')
      }
      const userDto = {
        username: user._doc.username,
        profilePicture: user._doc.profilePicture,
        followers: user._doc.followers,
      }
      const tokens = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(userDto.username, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.status(200).json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: Function) {
    try {
      const { refreshToken } = req.cookies
      const token = await tokenService.removeToken(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }

  async checkAuth(req: Request, res: Response, next: Function) {
    try {
      const accessToken = req.headers?.authorization?.split(' ')[1] // Bearer accessToken
      if (!accessToken) {
        return res.status(401).json({ message: 'Не авторизован' })
      }
      const validateAccessToken = tokenService.validateAccessToken(accessToken)
      if (validateAccessToken) {
        const user = await UserModel.findOne({
          username: validateAccessToken.username,
        }).exec()
        const userDto = {
          username: user._doc.username,
          profilePicture: user._doc.profilePicture,
          followers: user._doc.followers,
        }

        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.username, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        return res.status(200).json(tokens)
      }
      const { refreshToken } = req.cookies
      const validateRefreshToken =
        tokenService.validateRefreshToken(refreshToken)
      if (validateRefreshToken) {
        const user = await UserModel.findOne({
          username: validateRefreshToken._doc.username,
        }).exec()
        const userDto = {
          username: user._doc.username,
          profilePicture: user._doc.profilePicture,
          followers: user._doc.followers,
        }
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.username, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {
          maxAge: 60 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        return res.status(200).json(tokens)
      }
      res.clearCookie('refreshToken')
      return res.status(401).json({ message: 'Не авторизован' })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
