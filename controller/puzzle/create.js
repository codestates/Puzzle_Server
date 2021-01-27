const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, userPuzzle, puzzleLabel } = require('../../models')
//puzzles테이블, userPuzzle테이블, labels 테이블, PuzzleLabels테이블을 채우고, project와 comment에 연결되야 한다.
module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const { particle, title, description, puzzleId, labelId, projectId } = req.body
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //퍼즐 생성 하나의 프로젝트 안에 같은 퍼즐조각 번호가 없어야한다.
        const [puzzleInfo, created] = await puzzle.findOrCreate({
            where: {
                particle: particle,
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
            const puzzleLabelInfo = await puzzleLabel.create({
                puzzleId: puzzleInfo.id,
                labelId: labelId
            })


            res.status(200).json({
                "data": "ok"
            })
        }
    }

}