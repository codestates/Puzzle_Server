const {
    isAuthorized
} = require('../tokenFunctions')
const { label } = require("../../models")

module.exports = async (req, res) => {
    //라벨을 클릭하면 /lable/read/:id요청이 실행된다.
    //응답은 라벨의 name, description, color값을 보낸다.
    const labelId = req.params.id
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const labelInfo = await label.findAll({
            raw: true,
            where: { id: labelId }
        })
        if (!labelInfo) {
            res.status(404).json({ "error": "can't find labels" })
        } else {
            res.status(200).json({ "lable": labelInfo })
        }
    }
}