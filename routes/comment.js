const express = require('express')
const { commentController } = require('../controller')
const commentRouter = express.Router();

commentRouter.post('/create', commentController.create)
commentRouter.get('/read', commentController.read)
commentRouter.patch('/update', commentController.update)
commentRouter.delete('/delete', commentController.remove)



module.exports = commentRouter