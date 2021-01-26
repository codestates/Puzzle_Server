const {
    isAuthorized
} = require('../tokenFunctions')
const { project, puzzle } = require('../../models')
//프로젝트의 퍼즐조각 개수를 설정한다.
module.exports = async (req, res) => {
    const { puzzleNum, projectId } = req.body
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(404).json({ "error": "can't create puzzles" })
    } else {
        const setPuzzleNum = await project.update({
            puzzleNum: puzzleNum
        }, {
            where: { id: projectId }
        })
        if (!setPuzzleNum) {
            res.status(404).json({ "error": "can't create puzzles" })
        } else {
            res.status(200).json({ "message": "ok" })
        }

    }
}