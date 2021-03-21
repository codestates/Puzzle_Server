const {
    isAuthorized
} = require('../tokenFunctions')
const { project, userPermission, user } = require('../../models')

module.exports = async (req, res) => {
    //usercode: array
    const { title, description, usercode, imageUrl } = req.body
    const verifiedToken = isAuthorized(req);
    if (!verifiedToken) {
        res.status(400).json({ "error" : "can't create new project(jwt)" })
    }else {
        const { id } = verifiedToken;
        //fix: 본인의 유저코드를 usercode배열에 담아서 보내도 추가하지 못하도록 하는 작업
          //1. 토큰으로 요청한 유저의 usercode를 알아낸다(reqUsercode) 
          //2. req.body.usercode 배열에서 reqUsercode가 있다면 그 유저코드만 제외하고(filter사용) req.body.usercode에 할당
        const reqUser = await user.findOne({
            where: { id: id }
        })
        const reqUsercode = reqUser.usercode;
        
        //1. project 테이블에 insert into
        const projectInfo = await project.create({
            title: title,
            description: description,
            isFinish: false,
            projectImg: imageUrl,
            /* 컬럼 추가 필요: coordinates 좌표값을 갖고 있는 숫자문자열 */
        })
        //2. 요청한 유저를 userPermission 테이블에 등록
        const userProject = await userPermission.create({
            userId: id,
            projectId: projectInfo.id
        })

        if (Array.isArray(usercode)) {
            const alterUsercodes = usercode.filter(el => {
                if (el === reqUsercode) { 
                    return false;
                }
                return true;
            })

            //3. 만약 요청의 body에 usercode가 배열이고 length가 1 이상이라면,
            if (alterUsercodes.length > 0) {
                alterUsercodes.forEach(async (alterUsercode) => {
            //4. 그 유저코드를 가진 유저를 찾고, 
                    const addUser = await user.findOne({
                        raw: true,
                        where: {
                            usercode: alterUsercode
                        }
                    })
                    if (!addUser) {
                        res.status(404).json({"error": "There is no user information matching the usercode"})
                    }else {
            //5. 그 유저코드를 가진 유저를 userPermission 테이블에 등록
                        await userPermission.create({
                            userId: addUser.id,
                            projectId: userProject.projectId
                        })
                    }
                })
            }
        }
        res.status(200).json({"message": "ok"})
    }
}
