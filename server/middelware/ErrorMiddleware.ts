export {}
const ApiError = require('./ApiError')
import { Request, Response } from 'express'

interface ErrorType extends Error {
  status: number
  message: string
}

module.exports = function (
  err: ErrorType,
  req: Request,
  res: Response,
  next: Function
) {
  // console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status })
  }
  return res
    .status(500)
    .json({ message: 'Непредвиденная ошибка!' + ' ' + err.message })
}
