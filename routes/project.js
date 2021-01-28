const express = require('express')
const { projectController } = require('../controller')
const projectRouter = express.Router();
const { isLoggedIn } = require('../controller/middlewares')
const  upload  = require('../controller/uploadFunctions/uploadProject')

projectRouter.get('/:id', projectController.id)
projectRouter.post('/invite', projectController.invite)
projectRouter.post('/setpuzzle/:id', isLoggedIn, upload.single('image'), projectController.setpuzzle)
projectRouter.post('/update/:id', projectController.update)

module.exports = projectRouter