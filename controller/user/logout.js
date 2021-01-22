const {
    generateAccessToken,
    generateRefreshToken
} = require('../tokenFunctions')
const { user } = require('../../models')
module.exports = (req, res) => {
    //accessToken
    //refreshToken
    const authorization = req.headers.authorization
    if (authorization === null) {
        res.status(404).json({ "error": "it can't logout" })
    } else {
        req.headers.authorization = null
        res.clearCookie('refreshToken')
        res.status(200).json({ "message": "logout success" })
    }


}