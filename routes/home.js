const express = require('express')
const { homeController } = require('../controller')
const homeRouter = express.Router();

homeRouter.get('/', homeController.home)
homeRouter.post('/search', homeController.search)
homeRouter.post('/create', homeController.create)
homeRouter.delete('/delete/:projectId', homeController.remove)

module.exports = homeRouter