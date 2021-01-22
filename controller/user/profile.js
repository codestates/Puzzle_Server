const { user } = require('../../models')

module.exports = (req, res) => {
  console.log(req.file)
  console.error('err')
}

//질문: 이용자가 프로필사진을 삭제한다면(기본프사로 되돌린다면), S3에 업로드한 파일은 어떻게 삭제?
  //방법 찾아보기 
  //profileDelete 엔드포인트로 요청보내면 기본이미지를 ...?

//controller/user/upload에서 해주어야 할 작업들
  //S3 업로드 전에 인증작업 거친 후 업로드
  //req.file.location을 해당 유저의 데이터베이스에 저장한다

  //flow 정리
  //1. 클라이언트 측에서 form-data 형식으로 이미지를 보낸다
  //2. (파일 업로드 전) 인증검사를 한다 -> upload.sing('image') 앞에 미들웨어 하나 추가
    //2.1 
    //2.2
  //3. 인증이 끝났으면 S3에 파일을 업로드한다
  //4. 업로드 후, req.file.location으로 파일의 주소를 데이터베이스에 업로드
  //5. res.json({"url": req.file.location, "message": "image upload success"})
