const {
    isAuthorized
} = require('../tokenFunctions')
const { project, userPermission, user } = require('../../models')

module.exports = async (req, res) => {
    const { title, description, usercode } = req.body
    const verifiedToken = isAuthorized(req);
    if (!verifiedToken) {
        res.status(400).json({ "error" : "can't create new project(jwt)" })
    }else {
        //1. project 테이블에 insert into
        const { id } = verifiedToken;

        const projectInfo = await project.create({
            title: title,
            description: description,
            isFinish: false,
        })
        //2. 요청한 유저를 userPermission 테이블에 등록
        const userProject = await userPermission.create({
            userId: id,
            projectId: projectInfo.id
        })
        //3. 만약 요청의 body에 usercode를 (배열의 형식으로) 담아서 보냈다면,
        if (usercode.length > 0) {
            usercode.forEach(async (userco) => {
        //4. 그 유저코드를 가진 유저를 찾고, 
                const addUser = await user.findOne({
                    raw:true,
                    where: {
                        usercode: userco
                    }
                })
                if (!addUser) {
                    res.status(404).json({"message": "There is no user information matching the usercode"})
                }else {
        //5. 그 유저코드를 가진 유저를 userPermission 테이블에 등록
                    await userPermission.create({
                        userId: addUser.id,
                        projectId: userProject.projectId
                    })
                }
            })
        }
        res.status(200).json({"message": "ok"})
    }
}
