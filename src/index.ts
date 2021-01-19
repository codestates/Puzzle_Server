import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/user'
import homeRouter from './routes/home'
import projectRouter from './routes/project'
import commentRouter from './routes/comment'
import puzzleRouter from './routes/puzzle'
import morgan from 'morgan'

const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(morgan('dev'))
app.use(cookieParser());
//라우팅 경로
//users, home, project, comment, puzzle 

app.use('/users', usersRouter)
app.use('/home', homeRouter)
app.use('/project', projectRouter)
app.use('/puzzle', puzzleRouter)
app.use('/comment', commentRouter)

app.listen(4000, () => {
  console.log('server start...')
});