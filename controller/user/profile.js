const { user } = require('../../models')
const { isAuthorized } = require('../tokenFunctions')
module.exports = async (req, res) => {
  const verifiedToken = isAuthorized(req);
  console.log('test')
  console.log(verifiedToken)
  if (!verifiedToken) {
    res.json({ "message": "there isn't token or invalid token" })
  } else { //verifiedToken = {id: 유저테이블 id, name: 유저테이블의 name}
    const { id } = verifiedToken
    const updatedUser = await user.update({
      profileImg: req.file.location
    }, {
      where: { id: id }
    });

    if (!updatedUser) {
      res.json({ "message": "There are no users with matching information" })
    } else {
      res.json({ "url": req.file.location, "message": "image upload success" });
    }
  }
}
//(이 각주 제가 삭제하겠습니다.)
//이용자가 프로필사진을 삭제한다면(기본프사로 되돌린다면), S3에 업로드한 파일은 어떻게 삭제?
  //방법 찾아보기 
  //그냥 삭제 않는 것도 방법



