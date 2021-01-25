const {
    generateAccessToken,
    generateRefreshToken,
    isAuthorized
} = require('../tokenFunctions')
const { puzzle } = require('../../models')

module.exports = async (req, res) => {
    const puzzleInfo = await puzzle.create()
}