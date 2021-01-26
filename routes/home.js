const express = require('express')
const { homeController } = require('../controller')
const homeRouter = express.Router();

homeRouter.get('/', homeController.home)
homeRouter.post('/search', homeController.search)
homeRouter.post('/create', homeController.create)
homeRouter.patch('/update', homeController.update)
homeRouter.delete('/delete/:id', homeController.remove)

module.exports = homeRouter