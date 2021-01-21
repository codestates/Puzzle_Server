import express from 'express';
import controller from '../controller';
const usersRouter = express.Router();

usersRouter.post('/login', controller.user.login)
usersRouter.post('/signup', controller.user.signup)
usersRouter.post('/logout', controller.user.logout)
usersRouter.get('/userinfo', controller.user.userinfo)
usersRouter.get('/google', controller.user.google)
usersRouter.post('/google', controller.user.google)
usersRouter.get('/kakao', controller.user.kakao)
usersRouter.post('/kakao', controller.user.kakao)

export default usersRouter
