// Для устранени ошибки: Невозможно повторно объявить переменную "router" с областью видимости "Блок".ts
export {}
const Router = require('express')
const router = new Router()
const friendsController = require('../controllers/friendsController')

router.get('/search', friendsController.search)
router.post('/add', friendsController.add)
// router.delete('/friends')

module.exports = router
