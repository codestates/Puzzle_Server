const {
    generateAccessToken,
    generateRefreshToken
} = require('../tokenFunctions')
const { user } = require('../../models')
const sha256 = require('../lib/SHA256')
require('dotenv').config()

module.exports = async (req, res) => {
    const { email, password, name, phone } = req.body;

    const [newUserInfo, created] = await user.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            password: sha256(password + process.env.SALT),
            name: name,
            phone: phone,
            usercode: sha256(email).slice(0, 8)
        }
    })
    // console.log(newUserInfo)
    if (!created) {
        res.status(409).json({ "error": "email is already exist" })
    } else {
        res.status(201).json({ "message": "ok" })
    }
}