const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, user, label, puzzleLabel, userPuzzle, comment } = require('../../models')


module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const puzzleId = req.params.id
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        const connection = await userPuzzle.findOne({
            where: {
                puzzleId: puzzleId,
                userId: verifiedToken.id
            }
        })

        if (!connection) {
            res.status(404).json({"message": "You are not a member of the project this puzzle belongs to"})
        }else {
            //퍼즐 정보를 부른다.
            const puzzleInfo = await puzzle.findOne({
                raw: true,
                where: { id: puzzleId },
            })
            // console.log(puzzleInfo)

            //퍼즐Id와 일치하는 puzzleLabel 정보를 전부 부른다.
            //puzzleLabel에서 찾은 라벨 정보를 전부 불러온다.
            const puzzleLabels = await puzzleLabel.findAll({
                raw: true,
                attributes: ["puzzleId", "labelId"],
                where: { puzzleId: puzzleId }
            })
            const labelIds = puzzleLabels.map(el => {
                return el.labelId
            })
            // console.log(puzzleLabels)

            //라벨id로 라벨 정보를 불러와 puzzleInfo에 담아준다.
            puzzleInfo["labels"] = await label.findAll({
                raw: true,
                where: { id: labelIds },
                attributes: ["id", "name", "description", "color"]
            })

            //퍼즐 작성자 정보를 가져와 puzzleInfo에 담아준다.
            const puzzleWriter = await userPuzzle.findOne({
                raw: true,
                where: { puzzleId: puzzleId }
            })
            puzzleInfo["wirter"] = await user.findOne({
                raw: true,
                where: { id: puzzleWriter.userId },
                attributes: ["id", "name", "profileImg"]
            })

            //퍼즐 코멘트를 불러와 puzzleInfo에 담는다.
            //작성자의 이름을 comment 결과에 추가한다.
            const commentInfo = await comment.findAll({
                raw: true,
                where: { puzzleId: puzzleId },
                include: { model: user, attributes: ["name"] }
            })
            // console.log(commentInfo)


            res.status(200).json({
                "puzzle": puzzleInfo,
                "comment": commentInfo
            })
        }
        

    }
}


