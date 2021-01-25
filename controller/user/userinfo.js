const {
    isAuthorized
} = require('../tokenFunctions')
const { user } = require('../../models')
require('dotenv').config();

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req);
    console.log(verifiedToken)
    if (!verifiedToken) {
        res.json({ "message": "can't get user infomation" })
    } else {
        const { id, name } = verifiedToken
        const userInfo = await user.findOne({
            raw: true,
            where: {
                id: id,
                name: name
            }
        })
        const { email, phone, profileImg, usercode } = userInfo//id, name변수명이 verifiedToken 과 중복
        // console.log(userInfo)
        res.json({
            "data": {
                "id": id, //verifiedToken.id
                "name": name,//verifiedToken.name
                "email": email,
                "phone": phone,
                "profileImg": profileImg,
                "usercode": usercode
            }
        })
    }
}