import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const errorMiddleware = require('./middelware/ErrorMiddleware')
const cors = require('cors')

dotenv.config()

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app: Express = express()
const port = process.env.PORT

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
