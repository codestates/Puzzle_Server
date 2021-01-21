const {
    isAuthorized
} = require('../tokenFunctions')
const { user } = require('../../models')
require('dotenv').config();

module.exports = async (req, res) => {
    const verifyToken = isAuthorized(req);
    if (!verifyToken) {
        res.json({ "message": "can't get user infomation" })
    } else {
        const { id, name } = verifyToken
        const userInfo = await user.findOne({
            raw: true,
            where: {
                id: id,
                name: name
            }
        })
        const { email, phone, profileImg, usercode } = userInfo//id, name변수명이 verifyToken 과 중복
        // console.log(userInfo)
        res.json({
            "data": {
                "id": id, //verifyToken.id
                "name": name,//verifyToken.name
                "email": email,
                "phone": phone,
                "profileImg": profileImg,
                "usercode": usercode
            }
        })
    }
}