const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken
} = require('../tokenFunctions')
const { user } = require('../../models')
const sha256 = require('../lib/SHA256')
require('dotenv').config()

module.exports = async (req, res) => {
    // "email": "123@email.com",
    // "password": "1234"
    const { email, password } = req.body

    const findUser = await user.findOne({
        where: {
            email: email,
        }
    })
    if (!findUser) {
        res.status(404).json({ "message": "invalid user info" })
    }
    const userInfo = await user.findOne({
        raw: true,
        where: {
            email: email,
            password: sha256(password + process.env.SALT)
        }
    })

    // console.log(userInfo)
    if (!userInfo) {
        res.status(404).json({ "message": "invalid user info" })
    } else {
        const obj = { id: userInfo.id, email: userInfo.email }
        const accessToken = generateAccessToken(obj);
        const refreshToken = generateRefreshToken(obj);

        sendRefreshToken(res, refreshToken)
        sendAccessToken(res, accessToken)
    }
}
