// Для устранени ошибки: Невозможно повторно объявить переменную "router" с областью видимости "Блок".ts
export {}
const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/checkauth', userController.checkAuth)

module.exports = router
