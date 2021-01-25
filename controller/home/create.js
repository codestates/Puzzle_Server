const {
    isAuthorized
} = require('../tokenFunctions')
const { project } = require('../../models')

module.exports = async (req, res) => {
    //프로젝트를 생성한다.
    const { title, description, projectImg } = req.body
    const varifyedToken = isAuthorized(req);
    const projectInfo = await project.create({
        title: title,
        description: description,
        isFinish: false,
        projectImg: projectImg
    })

    if (!projectInfo) {
        res.status(404).json({
            "error": "can't create new project"
        })
    } else {
        res.status(200).json({
            "messages": "ok"
        })
    }
}