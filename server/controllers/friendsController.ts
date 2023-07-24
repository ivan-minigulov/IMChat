import { Request, Response } from 'express'
const ApiError = require('../middelware/ApiError')
const { UserModel } = require('../models/User')
const tokenService = require('../serviceModels/tokenService')

class FriendsController {
  async search(req: Request, res: Response, next: Function) {
    try {
      const { value } = req.query
      const users = await UserModel.find(
        {
          username: { $regex: value, $options: 'i' },
        },
        'username'
      ).exec()

      return res.status(200).json(users)
    } catch (e) {
      return res.status(200)
    }
  }

  async add(req: Request, res: Response, next: Function) {
    try {
      const { username, friendname } = req.body
      const user = await UserModel.findOne({ username }).exec()
      if (
        user.followers.filter((friend: string) => friend === friendname).length
      ) {
        const accessToken = req.headers?.authorization?.split(' ')[1] // Bearer accessToken
        if (!accessToken) {
          return res.status(401).json({ message: 'Не авторизован' })
        }
        return res.status(200).json({ accessToken })
      }
      const userNew = await UserModel.findOneAndUpdate(
        { username },
        { $push: { followers: friendname } },
        { new: true }
      ).exec()

      await UserModel.updateOne(
        { friendname },
        { $push: { followers: username } }
      ).exec()

      const userDto = {
        username: userNew._doc.username,
        profilePicture: userNew._doc.profilePicture,
        followers: userNew._doc.followers,
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
}

module.exports = new FriendsController()
