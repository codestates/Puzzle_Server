import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './route/user'
import homeRouter from './route/home'
import projectRouter from './route/project'
import commentRouter from './route/comment'
import puzzleRouter from './route/puzzle'

const app = express()

app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());
//라우팅 경로
  //users, home, project, comment, puzzle 
  app.use('/users', userRouter)
  app.use('/home', homeRouter)
  app.use('/project', projectRouter)
  app.use('/comment', commentRouter)
  app.use('/puzzle', puzzleRouter)

  app.use('/', (req, res) => {
    
  })

app.listen(4000, () => {
  console.log('server start...')
});