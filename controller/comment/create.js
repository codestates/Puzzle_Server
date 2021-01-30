const {
    isAuthorized
} = require('../tokenFunctions')
const { comment } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const { puzzleId, description } = req.body
    const userId = verifiedToken.id

    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const commentInfo = await comment.create({
            userId: userId,
            puzzleId: puzzleId,
            description: description
        })
        if (!commentInfo) {
            res.status(404).json({ "error": "can't read comment" })
        } else {
            res.status(200).json({ "message": "ok" })

        }
    }
}