const {
    isAuthorized
} = require('../tokenFunctions')
const { label, userPermission, puzzleLabel } = require("../../models")

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const { name, description, color, projectId } = req.body  //projectId가 아니라 puzzleId를 받아야 한다
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        if (!name || !description || !color) {
            res.status(422).json({ "error": "you need to fill input information" })
        } else {
            //라벨 생성
            const labelInfo = await label.create({
                name: name,
                description: description,
                color: color,
                projectId: projectId
            })

            //라벨은 생성될 뿐 어느 퍼즐과도 연관되지 않는다.
            //퍼즐 페이지에서 update나 create를 할 때 연관된다.
            if (!labelInfo) {
                res.status(404).json({ "error": "can't create label" })
            } else {
                res.status(200).json({ "message": "ok" })

            }
        }
    }
}
