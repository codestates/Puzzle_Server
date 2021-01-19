import express from 'express'
import controller from '../controller'

const commentRouter = express.Router();

commentRouter.post('/create', controller.comment.create)
commentRouter.get('/read', controller.comment.read)
commentRouter.patch('/update', controller.comment.update)
commentRouter.delete('/delete', controller.comment.remove)



export default commentRouter