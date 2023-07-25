import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const errorMiddleware = require('./middelware/ErrorMiddleware')
const cors = require('cors')
const socket = require('socket.io')

dotenv.config()

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app: Express = express()
const port = process.env.PORT
const clientUrl = process.env.CLIENT_URL

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

app.use(errorMiddleware)

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

let users: Array<any> = []

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId)
}

const io = socket(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
})

io.on(
  'connection',
  (socket: {
    on: (arg0: string, arg1: { (userId: any): void; (data: any): void }) => void
    id: any
    to: (arg0: any) => {
      (): any
      new (): any
      emit: { (arg0: string, arg1: any): void; new (): any }
    }
  }) => {
    console.log('user connected')
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      io.emit('getUsers', users)
    })

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId)
      if (user) {
        io.to(user.socketId).emit('getMessage', {
          senderId,
          text,
        })
      }
    })

    //when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected!')
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
  }
)
