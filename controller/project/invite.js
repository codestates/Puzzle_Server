const {
    isAuthorized
} = require('../tokenFunctions')
const { user } = require('../../models')

module.exports = async (req, res) => {
    const { userCodes } = req.body // userCodes = [ooo, ooo, ooo]
    const invitedUser = user.findAll({
        where: { usercode: userCodes }
    })
    //초대받은 유저는 userPermissions의 userId가 저장된다.
    //또한 초대된 projectId도 저장된다.
}