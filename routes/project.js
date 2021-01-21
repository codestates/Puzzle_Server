const express = require('express')
const controller = require('../controller')
const projectRouter = express.Router();

projectRouter.get('/:id', controller.project.id)
projectRouter.post('/create', controller.project.create)
projectRouter.post('/invite', controller.project.invite)
projectRouter.post('/setpuzzle', controller.project.setpuzzle)
projectRouter.patch('/update', controller.project.update)

module.exports = projectRouter