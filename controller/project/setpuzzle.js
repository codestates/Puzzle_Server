const {
    isAuthorized
} = require('../tokenFunctions')
const { userPermission, project } = require('../../models')
//프로젝트의 이미지 퍼즐조각 개수 설정 => 프로젝트 이미지 업로드 
module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req);
    if (!verifiedToken) {
        res.status(404).json( {"message": "invalid token"})
    }else {  
        res.status(202).send({"url": req.file.location})
    }
}

//S3에 프로젝트 이미지 업로드하고, req.params.id로 프로젝트 특정한 후에
//그 프로젝트의 projectimg에 이미지url을 update