const {
    isAuthorized
} = require('../tokenFunctions')
const { project, user, userPermission } = require('../../models')

module.exports = async (req, res) => {
    //토큰확인여부 작성
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(404).json({ "error": "can't find main page" })

    } else {
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
            where: { projectId: projectsId }
        })//[ { projectId: 1, userId: 1 },{ projectId: 1, userId: 2 },{ projectId: 2, userId: 1 },{ projectId: 2, userId: 2 }]
        // console.log(userInvitedProjects)

        //프로젝트 id로 내가 속한 프로젝트를 전부 가져온다.
        const myProjects = await project.findAll({
            raw: true,
            where: { id: projectsId },
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
            res.status(200).json({
                "message": "you don't have any project",
                "projects": []
            })
        } else {
            res.status(200).json({
                "projects": myProjects
            })
        }

    }
}