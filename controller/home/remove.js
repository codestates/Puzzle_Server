const {
    generateAccessToken,
    generateRefreshToken,
    isAuthorized
} = require('../tokenFunctions')
const { userPermission, project } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req);
    if (!verifiedToken) {
        res.json({"message": "cant't delete information(jwt)"})
    }else {
        const { id } = verifiedToken;
        const projectId = req.params.id;
        const team = await userPermission.findAll({
            raw: true,
            where: {
                projectId: projectId
            }
        })
        console.log(team);
        //팀에 인원이 1명인 경우(->프로젝트 삭제)
        if (team.length === 1) {
            console.log(team);
            //1. 해당 유저의 userPermission을 삭제
            const targetProject = await userPermission.findOne({ 
                where: {
                    projectId: projectId,
                    userId: id
                }
            })
            if (!targetProject) {
                res.status(404).json({"message": "can't find project info"})
            }else {
                await userPermission.destroy({
                    where: {
                        projectId: projectId,
                        userId: id
                    }
                })
            }
            //2. 해당 project 삭제
            await project.destroy({
                where: {
                    id: projectId
                }
            })
        }else {
        //팀에 인원이 1명 이상인 경우(->프로젝트 탈퇴)
            const targetProject = await userPermission.findOne({ //userPermission에서 해당 프로젝트의 내 정보를 찾는다
                where: {
                    projectId: projectId,
                    userId: id
                }
            })
            if (!targetProject) {
                res.status(404).json({"message": "can't find project info"})
            }else {
                await userPermission.destroy({
                    where: {
                        projectId: projectId,
                        userId: id
                    }
                })
            }
        }
        
    }
    res.status(202).json({"message": "ok"})
}

// DELETE /home/delete/:id 
//req.params.id로 projectId를 가져올 수 있다
//1. req.params.id에 담긴 projectId로 유저가 삭제하기를 요청한 project를 찾는다
//2. (해당하는 project 테이블의 레코드를 지우기 전) userPermission 테이블에서 해당하는 유저들을 지운다
  //2.1 이 경우 생기는 문제: 팀원들 중 아무나 프로젝트를 삭제할 수 있다
  //2.2 프로젝트 삭제가 아니라 프로젝트 탈퇴의 개념?
    //2.2.1 req.params.id(project.id)와 토큰의 id(user.id)로 userPermission의 특정 레코드를 찾는다 
    //2.2.2 그 레코드를 삭제한다(팀 탈퇴)
  //2.3 만약 프로젝트에 해당된 멤버가 1명이라면, 그 유저의 userPermission을 삭제하고 그 다음 project 테이블의 레코드도 삭제한다