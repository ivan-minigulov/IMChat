import { Request, Response } from 'express'
const ApiError = require('../middelware/ApiError')
const { MessagerModel } = require('../models/Messager')
const tokenService = require('../serviceModels/tokenService')

class MessagerController {
  async getAll(req: Request, res: Response, next: Function) {
    try {
      const { username, friendname } = req.query
      const messager = await MessagerModel.findOne({
        username,
        friendname,
      }).exec()
      if (!messager) {
        const newMessager = new MessagerModel({ username, friendname })
        await newMessager.save()
        const messagerFriend = await MessagerModel.findOne({
          username: friendname,
          friendname: username,
        }).exec()
        if (!messagerFriend) {
          const newMessagerFriend = new MessagerModel({
            username: friendname,
            friendname: username,
          })
          await newMessagerFriend.save()
        }

        const newMessagerDto = {
          friendname: newMessager.friendname,
          messages: newMessager.messages,
        }
        return res.status(200).json(newMessagerDto)
      }

      const messagerFriend = await MessagerModel.findOne({
        username: friendname,
        friendname: username,
      }).exec()
      if (!messagerFriend) {
        const newMessagerFriend = new MessagerModel({
          username: friendname,
          friendname: username,
        })
        await newMessagerFriend.save()
      }
      const messagerDto = {
        friendname: messager.friendname,
        messages: messager.messages,
      }
      return res.status(200).json(messagerDto)
    } catch (e) {
      next(e)
    }
  }
  async add(req: Request, res: Response, next: Function) {
    try {
      const { username, friendname, message } = req.body
      const date = new Date()
      const messageForUser = {
        message: message,
        date: date.toUTCString(),
        key: username,
      }

      const messageForFriend = {
        message: message,
        date: date.toUTCString(),
        key: username,
      }

      const messagerUser = await MessagerModel.findOneAndUpdate(
        { username, friendname },
        { $push: { messages: messageForUser } },
        { new: true }
      ).exec()

      const messagerFriend = await MessagerModel.findOneAndUpdate(
        { username: friendname, friendname: username },
        { $push: { messages: messageForFriend } },
        { new: true }
      ).exec()

      const messagerDto = {
        friendname: messagerUser.friendname,
        messages: messagerUser.messages,
      }
      return res.status(200).json(messagerDto)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new MessagerController()
