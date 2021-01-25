const {
    isAuthorized
} = require('../tokenFunctions')
const { project, image } = require('../../models')

module.exports = async (req, res) => {
    //home의 프로젝트를 선택한다.
    const verifiedToken = isAuthorized(req)
    const projectId = req.parems.id

    const projectInfo = await project.findOne({
        where: { id: projectId }
    })
    const projectImg = await image.findOne({
        where: { projectId: projectId }
    })

}