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
        const { id, email } = verifiedToken
        const userInfo = await user.findOne({
            raw: true,
            where: {
                id: id,
                email: email
            }
        })
        console.log(userInfo)
        const { name, phone, profileImg, usercode } = userInfo//id, name변수명이 verifiedToken 과 중복
        // console.log(userInfo)
        res.status(200).json({
            "data": {
                "id": id, //verifiedToken.id
                "name": name,
                "email": email, //verifiedToken.email
                "phone": phone,
                "profileImg": profileImg,
                "usercode": usercode
            }
        })
    }
}