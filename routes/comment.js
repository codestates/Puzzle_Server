const express = require('express')
const { commentController } = require('../controller')
const commentRouter = express.Router();

commentRouter.post('/create', commentController.create)
commentRouter.get('/read/:id', commentController.read)
commentRouter.post('/update/:id', commentController.update)
commentRouter.delete('/delete/:id', commentController.remove)



module.exports = commentRouter