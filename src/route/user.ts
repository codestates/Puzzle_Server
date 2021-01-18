import express from 'express';
import {userController}  from '../controller'

const usersRouter = express.Router();

usersRouter.post('/login', userController.login)

export default usersRouter;