const {
    generateAccessToken,
    generateRefreshToken
} = require('../tokenFunctions')
const { user } = require('../../models')

module.exports = async (req, res) => {
    //req.body = email, password
    const { email, password } = req.body

    const userInfo = await user.findOne({
        where: {
            email: email,
            password: password
        }
    })
    if (!userInfo) {
        res.status(404).json({ "message": "invalid user info" })
    } else {
        // jwt
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none' }).status(200)
            .json({ "message": "ok", "accesstoken": accessToken })

    }
}

