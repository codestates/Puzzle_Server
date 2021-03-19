const {
    generateAccessToken,
    generateRefreshToken,
    isAuthorized
} = require('../tokenFunctions')
const { user, userPermission, project } = require('../../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;


module.exports = async (req, res) => {
    //토큰확인여부 작성
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //로그인 유저 정보 불러오기
        const { projectName } = req.body;
        const userInfo = await user.findOne({
            raw: true,
            attributes: { exclude: ['password'] },
            where: { id: verifiedToken.id }
        })
        console.log(userInfo)

        //로그인한 유저가 속한 프로젝트 id를 찾아 배열로 모은다. userPermission
        const myProjectsId = await userPermission.findAll({
            raw: true,
            attributes: ["projectId"],
            where: { userId: verifiedToken.id }
        })
        //console.log(myProjectsId)

        const projectsId = myProjectsId.map(el => {// 변수를 새로 설정하고 filter해야 한다.
            return el["projectId"]
        })//[1,2,3...]
        // console.log(projectsId)

        //프로젝트의 id를 가져와 각 id와 속해있는 모든 유저를 찾는다.
        const userInvitedProjects = await userPermission.findAll({
            raw: true,
            attributes: ["projectId", "userId"],
            where: { projectId:  projectsId }
        })//[ { projectId: 1, userId: 1 },{ projectId: 1, userId: 2 },{ projectId: 2, userId: 1 },{ projectId: 2, userId: 2 }]
        // console.log(userInvitedProjects)

        //프로젝트 id로 내가 속한 프로젝트를 전부 가져온다.
        const myProjects = await project.findAll({
            raw: true,
            where: { 
                id: projectsId, 
                title:  {[Op.like]: '%' + projectName + '%'} 
            },
        })
        // console.log(myProjects)

        for (let i = 0; i < myProjects.length; i++) {
            myProjects[i]["usersData"] = [];
            for (let j = 0; j < userInvitedProjects.length; j++) {
                if (myProjects[i].id === userInvitedProjects[j].projectId) {
                    let result = await user.findOne({
                        raw: true,
                        attributes: ["id", "name", "profileImg"],
                        where: { id: userInvitedProjects[j].userId }
                    })
                    myProjects[i]["usersData"].push(result)
                }
            }
        }
        if (!myProjects) {
            res.status(404).json({
                "message": "you don't have any project",
                "projects": []
            })
        } else {
            res.status(200).json({
                "loginUser": userInfo,
                "projects": myProjects
            })
        }

    }
}

//검색은 프로젝트 이름을 기준으로 
  //프로젝트 
//home 엔드포인트의 코드를 참조하여야 한다(-> 해당 유저의 모든 프로젝트정보 가져옴)
//home/search는 home에서 뿌려주는 것을 이름을 기준으로 필터링
//home 로직
  //
//const { projectName } = req.body
//project