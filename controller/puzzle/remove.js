const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, puzzleLabel, userPuzzle, comment, project, calendar } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const puzzleId = req.params.id
    const projectId = req.body.projectId
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //puzzle, puzzleLabel, userPuzzle, comment도 지워야 한다.
        const projectInfo = await project.findOne({
            raw: true,
            where: { id: projectId }
        })
        const puzzleInfo = await puzzle.findOne({
            where: { id: puzzleId }
        })

        const puzzleLabelInfo = await puzzleLabel.destroy({
            where: { puzzleId: puzzleId }
        })
        const commentInfo = await comment.destroy({
            where: { puzzleId: puzzleId }
        })
        const userPuzzleInfo = await userPuzzle.destroy({
            where: { puzzleId: puzzleId }
        })
        await puzzle.destroy({
            where: { id: puzzleId }
        })


        const calendarInfo = await calendar.create({
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDay(),
            log: `프로젝트 '${projectInfo.title}'에서 퍼즐 '${puzzleInfo.title}'을 제거함.`,
            userId: verifiedToken.id
        })

        res.status(200).json({ "message": "ok" })
    }
}