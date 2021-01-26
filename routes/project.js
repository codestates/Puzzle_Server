const express = require('express')
const { projectController } = require('../controller')
const projectRouter = express.Router();

projectRouter.get('/:id', projectController.id)
projectRouter.post('/invite', projectController.invite)
projectRouter.post('/setpuzzle', projectController.setpuzzle)
projectRouter.patch('/update', projectController.update)

module.exports = projectRouter