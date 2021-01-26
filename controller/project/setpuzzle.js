const {
    isAuthorized
} = require('../tokenFunctions')
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

}