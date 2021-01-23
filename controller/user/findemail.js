const { user } = require("../../models")
const sha256 = require("../lib/SHA256")
require("dotenv").config()

module.exports = async (req, res) => {
    const { name, phone } = req.body

    //1.이름과 전화번호만 입력한 경우 확인되면 그 값을 돌려준다.

    const findUser = await user.findOne({
        raw: true,
        where: {
            name: name,
            phone: phone
        }
    })
    if (!findUser) {
        res.status(404).json({
            "error": "user doesn't exist"
        })
    } else {
        res.status(200).json({
            "message": "ok",
            "data": findUser.email
        })
    }
}
