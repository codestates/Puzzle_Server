const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, puzzleLabel, userPuzzle, comment } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const puzzleId = req.params.id
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //puzzle, puzzleLabel, userPuzzle, comment도 지워야 한다.
        const puzzleLabelInfo = await puzzleLabel.destroy({
            where: { puzzleId: puzzleId }
        })
        const commentInfo = await comment.destroy({
            where: { puzzleId: puzzleId }
        })
        const userPuzzleInfo = await userPuzzle.destroy({
            where: { puzzleId: puzzleId }
        })
        const puzzleInfo = await puzzle.destroy({
            where: { id: puzzleId }
        })
        res.status(200).json({ "message": "ok" })
    }
}