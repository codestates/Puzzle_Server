const express = require('express')
const { homeController } = require('../controller')
const homeRouter = express.Router();

homeRouter.get('/', homeController.home)
homeRouter.post('/serach', homeController.search)
homeRouter.post('/create', homeController.create)
homeRouter.patch('/update', homeController.update)
homeRouter.delete('/delete', homeController.remove)

module.exports = homeRouter