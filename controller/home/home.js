const {
    isAuthorized
} = require('../tokenFunctions')
const { project, user, userPermission } = require('../../models')

module.exports = async (req, res) => {
    const verifyToken = isAuthorized(req)
    //토큰확인여부 작성
    const projectInfo = await project.findAll({
        raw: true,
        include: [
            { model: userPermission, required: true }
        ]
    })

    console.log(projectInfo[0]["userPermissions.userId"])
    const userInfo = await user.findAll({ raw: true })
    res.status(200).json({
        "users": userInfo,
        "data": projectInfo
    })
    //이렇게 res.json해선 안된다. data에 project마다 userid와 username, userImg를 같이 보내줘야 한다.

    //sudo? 정확하지 않다.
    //가져온 프로젝트의 id로 projectPermissions에서 프로젝트 id와 같이 있는 유저 id를 찾는다.
    //프로젝트 정보 중에서  로그인 유저 id와 일치하는 userPermissions를 전부 가져온다.
    //로그인 유저 id를 가지고 있는 userPermissions 행에서 projectId 전부를 가져온다.
    //가져온 projectId에 있는 다른 userId 정보를 가져온다.
    //프로젝트 data에 

}