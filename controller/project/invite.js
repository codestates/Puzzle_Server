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
        // console.log(invitedUser)

        //userPermiassions 테이블에 userId값을 findorcreate로 저장한다.
        const [userProject, created] = await userPermission.findOrCreate({
            where: { userId: invitedUser.id, projectId: projectId }
        })
        if (created) {
            res.status(200).json({
                "message": "ok"
            })
        } else {
            res.status(404).json({ "error": "it's already invited" })
        }
    }

}