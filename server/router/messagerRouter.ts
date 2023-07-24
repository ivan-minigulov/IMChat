// Для устранени ошибки: Невозможно повторно объявить переменную "router" с областью видимости "Блок".ts
export {}
const Router = require('express')
const router = new Router()
const messagerController = require('../controllers/messagerController')

router.get('/getall', messagerController.getAll)
router.post('/add', messagerController.add)

module.exports = router
