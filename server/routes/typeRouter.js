const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/:id', checkRole('ADMIN'),typeController.delete)
router.get('/', typeController.getAll)

module.exports = router
