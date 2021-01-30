const {
  isAuthorized
} = require('../tokenFunctions')
const { puzzle } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req);
    const image = req.file.location;
    const projectid = req.params.projectid; 
    const particle = req.params.particle; 
    if (!verifiedToken) {
      res.status(404).json( {"error": "not authorized" } )
    }else {
      const imageUpload = await puzzle.update({puzzleImg: image},{
        where: {projectId: projectid, particle: particle}
      })
      if (!imageUpload) {
        res.status(405).json({"error": "Failed to update image path in DB"})
      }else {
        res.status(200).json({"message": "upload success!"})
      }
    }
}

//조각이미지(=puzzle image)를 S3에 업로드하고 해야할 작업
//특정 프로젝트 내의 particle로 퍼즐 특정한다(projectId와 particle 필요, 둘다 params로 받는다)
//puzzleImg에 req.file.location을 update
