const {
    isAuthorized
} = require('../tokenFunctions')
const { user, userPermission } = require('../../models')


module.exports = async (req, res) => {
    const { usercode, projectId } = req.body // userCodes = [ooo, ooo, ooo]
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        //usercode로 user를 찾는다.
        const invitedUser = await user.findAll({
            raw: true,
            attributes: { exclude: ["password"] },
            where: { usercode: usercode }
        })
        console.log(invitedUser)

        //userPermiassions 테이블에 userId값을 findorcreate로 저장한다.
        const invitedName = []
        Promise.all(invitedUser.map(async (el, idx) => {
            const [userProject, created] = await userPermission.findOrCreate({
                where: { userId: invitedUser[idx].id, projectId: projectId }//userId 2개면 2번 돈다. userProject에는 userId가 하나씩 두번 들어간다.
            })
            console.log("123")

            if (created) {
                invitedName.push(el.name)
            }

        })).then(datas => {
            if (invitedName.length !== 0) {
                res.status(200).json({
                    "data": invitedName
                })
            } else {
                res.status(404).json({ "error": "it's already invited" })
            }
        })
            .catch(err => console.log(err))

    }

}