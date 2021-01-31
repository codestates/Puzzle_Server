const {
    isAuthorized
} = require('../tokenFunctions')
const { label } = require("../../models")

module.exports = async (req, res) => {
    const labelId = req.params.id
    const { name, description, color } = req.body
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        if (!name && !description && !color) {
            res.status(422).json({ "error": "you need to fill input information" })
        }
        //입력된 req.body 값만 받아서 업데이트 한다.
        const labelInfo = await label.update(req.body, {
            where: { id: labelId }
        })
        if (!labelInfo) {
            res.status(404).json({ "error": "can't update label" })
        } else {
            res.status(200).json({ "message": "update complete" })
        }
    }
}