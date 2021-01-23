const sha256 = require("../lib/SHA256")
const { isAuthorized } = require("../tokenFunctions/index")
const { user } = require("../../models")
require("dotenv").config()

module.exports = async (req, res) => {
    const authorization = isAuthorized(req) //{id: ooo, name: ooo}
    if (!authorization) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const { name, password, changePw, phone, profileImg } = req.body //입력이 된 값만 넘어온다.
        // console.log(req.body)
        if (!password && !changePw) {
            const userInfo = await user.update(req.body, {
                where: {
                    id: authorization.id
                }
            })
            res.status(200).json({ "message": "ok" })

        } else if (password && changePw) {
            const findUser = await user.findOne({
                where: { id: authorization.id }
            })

            if (sha256(password + process.env.SALT) !== findUser.password) {
                res.status(404).json({ "error": "not invalid password" })

            } else {
                req.body["password"] = sha256(changePw + process.env.SALT)
                delete req.body["changePw"]

                const userInfo = await user.update(req.body, {
                    where: {
                        id: authorization.id
                    }
                })
                res.status(200).json({ "message": "ok complete change!" })

            }
        } else {
            res.status(404).json({ "error": "not invalid password" })

        }
    }
}