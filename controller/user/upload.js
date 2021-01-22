const { user } = require('../../models')

module.exports = (req, res) => {
  console.log(req.file)
  res.send('test')
}

//질문: 이용자가 프로필사진을 삭제한다면(기본프사로 되돌린다면), S3에 업로드한 파일은 어떻게 삭제?
//controller/user/upload에서 해주어야 할 작업들
  //req.file.location
  //