const Router = require('express')
const router = new Router()
const  projectsController= require('../controllers/projectsController')

// метод создание
// router.post('/', projectsController.create) 
// // метод получение
// router.get('/', projectsController.getAll)
// // метод удаление
// router.delete('/:id', projectsController.delete)

module.exports = router
