const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle } = require('../../models')

module.exports = async (req, res) => {
    // const verifiedToken = ifAuthorized(req)
    // if (!verifiedToken) {
    //     res.status(404).json({ "error": "can't create puzzles" })
    // } else {
    //     const puzzleInfo = await puzzle.create({
    //         puzzleNum: req.body.puzzleNum
    //     })

    // }
}