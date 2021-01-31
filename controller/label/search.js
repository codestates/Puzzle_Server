const {
    isAuthorized
} = require('../tokenFunctions')
const { label } = require("../../models")

module.exports = async (req, res) => {
    const { name } = req.body
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        //라벨 이름으로 검색
        const labelInfo = await label.findAll({
            raw: true,
            where: { name: name }
        })
        if (!labelInfo) {
            res.status(404).json({ "error": "can't find label name" })
        } else {
            res.status(200).json({ "label": labelInfo })
        }
    }
}