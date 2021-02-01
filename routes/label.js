const express = require('express')
const { labelController } = require('../controller')
const labelRouter = express.Router();
const { isLoggedIn } = require('../controller/middlewares')
const upload = require('../controller/uploadFunctions/uploadProject')

labelRouter.get('/read/:id', labelController.id)
labelRouter.post('/create', labelController.create)
labelRouter.post('/remove/:id', labelController.remove)
labelRouter.post('/update/:id', labelController.update)
labelRouter.post('/search', labelController.search)

module.exports = labelRouter