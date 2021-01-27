const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    //라벨 crud 하는 작업 필요
    const puzzleId = req.params.id
    console.log(req.body)
    const { title, description, progress } = req.body
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        const update = await puzzle.update(req.body, {
            where: { id: puzzleId }
        })
        if (!update) {
            res.status(403).json({ "error": "update fail" })
        } else {
            const findPuzzle = await puzzle.findOne({
                raw: true,
                where: { id: puzzleId },
            })

            if (findPuzzle.progress !== 100) {
                const finishPuzzle = await puzzle.update({
                    isFinish: false
                }, {
                    where: { id: puzzleId }
                })

            } else {
                const finishPuzzle = await puzzle.update({
                    isFinish: true,
                }, {
                    where: { id: puzzleId }
                })

            }
            res.status(202).json({ "message": "ok" })
        }
    }
}