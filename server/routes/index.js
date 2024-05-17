const Router = require('express')
const router = new Router()
const userTasksRouter = require('./userTasksRouter')
const usersRouter = require('./userRouter')
const projectsRouter = require('./projectsRouter')
const typeRouter = require('./typeRouter')

router.use('/users', usersRouter)
router.use('/userTasks', userTasksRouter)
// router.use('/Projects', projectsRouter)
router.use('/projects', typeRouter)

module.exports = router
