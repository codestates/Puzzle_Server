const {
    generateAccessToken,
    generateRefreshToken,
    isAuthorized
} = require('../tokenFunctions')
const { user, userPermission, project } = require('../../models')

module.exports = async (req, res) => { 
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(404).json({"err": "cant't authorized token(토큰이 falsy값)"})
    }else {
        const { title, description, puzzleNum, puzzleFinished } = req.body;  
        const { id } = verifiedToken;
        const projectId  = req.params.id;
        console.log(req.body.puzzleNum)
        const targetProject = await userPermission.findOne({  //요청한 '유저'의 '특정 프로젝트'를 찾는다
            rew: true,
            where: {
                userId: id,
                projectId: projectId
            }
        })
        if (!targetProject) {
            res.status(404).json({"error": "can't find projectinfo"})
        }else {
            const update = await project.update(req.body, {  //찾은 특정 프로젝트에 req.body로 받아온 값을 업데이트 한다
                where: {
                    id: targetProject.projectId
                }
            })
            if (!update) {
                res.status(403).json({"error": "update fail"})
            }else {
                res.status(202).json({"message": "ok"})
            }
        }
    

    }
    
}

//최종적인 목표: project 테이블에 req.body에 담긴 내용을 업데이트 해야 한다
//req.body: title, descripsion, puzzlNum 