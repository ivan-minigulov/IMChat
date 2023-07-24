const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const friendsRouter = require('./friendsRouter')
const messageRouter = require('./messagerRouter')

router.use('/user', userRouter)
router.use('/friends', friendsRouter)
router.use('/message', messageRouter)

module.exports = router
