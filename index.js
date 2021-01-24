const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/user')
const homeRouter = require('./routes/home')
const projectRouter = require('./routes/project')
const commentRouter = require('./routes/comment')
const puzzleRouter = require('./routes/puzzle')
const morgan = require('morgan')
const https = require('https');
const fs = require('fs')

const app = express()

const cert = fs.readFileSync("/etc/letsencrypt/live/api.teampuzzle.ga/fullchain.pem","utf-8");
const key = fs.readFileSync("/etc/letsencrypt/live/api.teampuzzle.ga/privkey.pem","utf-8");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json())
//라우팅 경로
//users, home, project, comment, puzzle 

app.use('/user', usersRouter)
app.use('/home', homeRouter)
app.use('/project', projectRouter)
app.use('/puzzle', puzzleRouter)
app.use('/comment', commentRouter)


https
.createServer(
    {
        key : key,
        cert : cert
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now')
    })
).
app.listen(4000, () => {
  console.log('server start...')
});