const { user } = require("../../models")
const sha256 = require("../lib/SHA256")
require("dotenv").config()

module.exports = async (req, res) => {
    const { name, password, phone } = req.body

    //1.이름과 전화번호만 입력한 경우 확인되면 그 값을 돌려준다.
    if (name && phone && !password) {
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
            res.status(200).json({ "message": "ok", "body": { name: name, phone: phone } })
        }

        //2. findpw를 다시 실행한다. 이번에는 1에서 반환한 값과 새로운 비밀번호 값을 담아 요청한다.
        //만일 비밀번호를 입력 안하고 확인을 누르면 1번이 또 실행된다. 이를 해결하려면?
        //= 클라에서 빈칸일 경우 입력하라고 한다. 제약조건으로 몇 글자 이상 적으라고 한다.
    } else if (name && phone && password) {
        const editedUser = await user.update({
            password: sha256(password + process.env.SALT)
        }, { where: { name: name, phone: phone } })
        res.status(200).json({ "message": "ok" })
    }
}
