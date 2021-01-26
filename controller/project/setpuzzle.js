const {
    isAuthorized
} = require('../tokenFunctions')
<<<<<<< Updated upstream
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
=======
const { project } = require('../../models')

module.exports = async (req, res) => {
    const { id, puzzleNum, projectImg, title, description } = req.body
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const projectInfo = await project.update(req.body, {
            where: { id: projectId }
        })


    }

>>>>>>> Stashed changes
}