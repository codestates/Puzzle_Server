const {
    generateAccessToken,
    generateRefreshToken,
    isAuthorized
} = require('../tokenFunctions')
const { user, userPermission, project } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(404).json({ "err": "cant't authorized token(jwt)" })
    } else {
        const { title, description, isFinish, usercode } = req.body;  //usercode: array
        const { id } = verifiedToken;//[1]
        const projectId = req.params.id;

        //요청한 '유저'의 '특정 프로젝트'를 찾는다
        const targetProject = await userPermission.findOne({
            raw: true,
            where: {
                userId: id,
                projectId: projectId
            }
        })

        if (!targetProject) {
            res.status(405).json({ "error": "can't find projectinfo" })
        } else {
            //요청한 유저가 자기자신의 유저코드 입력해도 추가 안되게 하기
            const reqUser = await user.findOne({
                where: {
                    id: id
                }
            })
            const reqUsercode = reqUser.usercode;
            const alterUsercodes = usercode.filter(el => {
                if (el === reqUsercode) {
                    return false;
                }
                return true;
            })

            //1. 요청에 usercode 배열에 유저코드를 담아서 보냈다면,
            if (alterUsercodes.length > 0) {
                alterUsercodes.forEach(async (alterUsercode) => {
                    //1.1 그 유저코드를 가진 유저를 찾는다(-> 1.1과 1.2 코드를 findOrCreate로 줄여줄 수도 있다)
                    const addUser = await user.findOne({
                        raw: true,
                        where: {
                            usercode: alterUsercode
                        }
                    })
                    if (!addUser) {
                        res.status(404).json({ "error": "There is no user information matching the usercode" })
                    } else {
                        //1.2 그 유저코드를 가진 유저를 userPermission 테이블에 등록
                        await userPermission.create({
                            userId: addUser.id,
                            projectId: projectId
                        })
                    }
                })
            }
            //찾은 특정 프로젝트에 req.body(usercode는 제외)로 받아온 값을 업데이트 한다
            delete req.body.usercode;
            const update = await project.update(req.body, {
                where: {
                    id: targetProject.projectId
                }
            })
            //update = 성공하면 [0] 실패하면 [1]을 가진다.
            if (!update[0]) {
                res.status(403).json({ "error": "update fail" })
            } else {
                res.status(202).json({ "message": "ok" })
            }
        }


    }

}

//최종적인 목표: project 테이블에 req.body에 담긴 내용을 업데이트 해야 한다
//req.body: title, descripsion, puzzlNum 