const express = require('express')
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const moment = require('moment');
const momentttz = require('moment-timezone');
const dotenv = require('dotenv')
dotenv.config();
const { userController } = require('../controller');
const usersRouter = express.Router();

momentttz().tz('Asia/Seoul').format();
let date = moment().format('YYYY-MM-DD HH:mm:ss')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: 'ap-northeast-2'
})

const upload = multer({ //multer({storage: 저장할 경로}), multerS3를 사용해서 업로드  
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `profileimg/${date}.${file.originalname}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
})


usersRouter.post('/login', userController.login)
usersRouter.post('/signup', userController.signup)
usersRouter.post('/logout', userController.logout)
usersRouter.get('/userinfo', userController.userinfo)
usersRouter.get('/google', userController.google)
usersRouter.post('/google', userController.google)
usersRouter.get('/kakao', userController.kakao)
usersRouter.post('/kakao', userController.kakao)
usersRouter.post('/userinfo', upload.single('image'), userController.upload)


module.exports = usersRouter
