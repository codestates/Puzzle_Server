const dotenv = require('dotenv')
dotenv.config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: 'ap-northeast-2'
})

const upload = multer({ //multer({storage: 저장할 경로}), multerS3를 사용해서 업로드  
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      console.log(file)
      cb(null, `projectimg/${Date.now()}.${file.originalname}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
})

module.exports = upload;