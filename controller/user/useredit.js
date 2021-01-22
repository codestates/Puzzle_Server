const sha256 = require("../lib/SHA256")
const { isAuthorized } = require("../tokenFunctions/index")
const { user } = require("../../models")
require("dotenv").config()

module.exports = async (req, res) => {
    const authorization = isAuthorized(req) //{id: ooo, name: ooo}
    if (!authorization) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const { body } = req //입력이 된 값만 넘어온다.
        body.password = sha256(body.password + process.env.SALT)
        console.log(body)
        const userInfo = await user.update(body, {
            where: {
                id: authorization.id
            }
        })
        console.log(userInfo)
        res.status(200).json({
            "message": "OK Change complete!"
        })
    }
}