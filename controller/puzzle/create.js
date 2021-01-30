const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, userPuzzle, puzzleLabel, userPermission } = require('../../models')
//puzzles테이블, userPuzzle테이블, labels 테이블, PuzzleLabels테이블을 채우고, project와 comment에 연결되야 한다.
module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    //labelId: array
    const {  title, description, puzzleId, labelId,  projectId } = req.body
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        //params에 담은 projectId가 실제로 있는 project인지 확인
        const connection = await userPermission.findOne({
            where: {
                userId: verifiedToken.id,
                projectId: projectId
            }
        })
        if (!connection) {
            res.status(405).json({"message": "No project ID or not your project"})
        }else {
        //particle 생성기능: puzzles 테이블에 레코드 추가될 때마다 서버에서(클라에서 입력x) particle 생성해서 update
        //일종의 auto increment
            const particles = await puzzle.findAll({
                raw: true,
                where: {
                    projectId: projectId
                },
                attributes: ["particle"]
            })
            //해당 프로젝트의 particle중 제일 큰 숫자를 구해서 +1 해서 그 값으로 create 한다.
            const particleArr = particles.map(el => {
                return el.particle;
            })
            let latestParticle = Math.max.apply(null, particleArr)
            if (latestParticle === -Infinity) {
                latestParticle = 0;
            }

        //퍼즐 생성 하나의 프로젝트 안에 같은 퍼즐조각 번호가 없어야한다.
        const [puzzleInfo, created] = await puzzle.findOrCreate({
            where: {
                particle: latestParticle + 1,
                projectId: projectId
            },
            defaults: {
                title: title,
                description: description,
                isFinish: false,
                progress: 0
            }
        })
        if (!created) {
            res.status(403).json({ "error": "this particle is already used in project" })
        } else {
            const userPuzzleInfo = await userPuzzle.create({
                userId: verifiedToken.id,
                puzzleId: puzzleInfo.id,
            })
            
            /* 
            const puzzleLabelInfo = await puzzleLabel.create({
                puzzleId: puzzleInfo.id,
                labelId: labelId
            }) 
            */


            res.status(200).json({
                "data": "ok"
            })
        }
 
        }
    }

}