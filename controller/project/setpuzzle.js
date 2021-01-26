const {
    isAuthorized
} = require('../tokenFunctions')
const { project } = require('../../models')
//프로젝트의 이미지 퍼즐조각 개수 설정
module.exports = async (req, res) => {
    const { id, puzzleNum } = req.body
    if (!id || !puzzleNum) {
        req.status(422).json({ "error": "you need to fill input" })
    } else {

        const verifiedToken = isAuthorized(req)
        if (!verifiedToken) {
            res.status(401).json({ "error": "not authorized" })
        } else {
            const projectInfo = await project.update({
                puzzleNum: puzzleNum
            }, {
                where: { id: id }
            })

            if (!projectInfo) {
                res.status(404).json({ "error": "can't set puzzle" })
            } else {
                res.status(200).json({ "message": "ok" })
            }
        }

    }
}