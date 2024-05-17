const Router = require('express')
const router = new Router()
const userTasksController = require('../controllers/userTasksController')

router.post('/', userTasksController.create)
router.get('/', userTasksController.getAll)
router.delete('/:id', userTasksController.delete)

// взятие конкретной задачи ???
// router.get('/:id', userTasksController.getOne)

module.exports = router
