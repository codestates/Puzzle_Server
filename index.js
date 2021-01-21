const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/user')
const homeRouter = require('./routes/home')
const projectRouter = require('./routes/project')
const commentRouter = require('./routes/comment')
const puzzleRouter = require('./routes/puzzle')
const morgan = require('morgan')

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