const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, userPuzzle, puzzleLabel, label, calendar, project } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    //라벨 crud 하는 작업 필요
    const puzzleId = req.params.id
    const { title, description, labelId } = req.body
    const projectId = req.body.projectId
    delete req.body.projectId
    // console.log(req.body.projectId)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        //퍼즐 작성자만 수정할 수 있도록 하기
        const connection = await userPuzzle.findOne({
            where: {
                userId: verifiedToken.id,
                puzzleId: puzzleId
            }
        })
        if (!connection) {
            res.status(404).json({"message": "You are not the creator of this puzzle"})
        }else {
            if (Array.isArray(labelId) && labelId.length > 0) {
                const findP = await puzzle.findOne({
                    where: {id: puzzleId}
                })
                labelId.forEach(async (la) => {
                    const confirmLabel = await label.findOne({
                        where: {id: la, projectId: findP.projectId}
                    })

                    if (!confirmLabel) {
                        res.status(407).json({"error": "can't find that label."})
                    }else {
                        await puzzleLabel.create({
                            puzzleId: puzzleId,
                            labelId: la
                        })    
                        
                    }
                })
                if (!title && !description) {
                    res.json({"message": "label updated"})
                }
            }
            delete req.body.labelId
            const update = await puzzle.update(req.body, {
                where: { id: puzzleId }
            })
            //update = 성공하면 배열 [0], 실패하면 배열 [1]값을 가진다.
            if (!update[0]) {
                res.status(403).json({ "error": "update fail" })
            } else {

                const projectInfo = await project.findOne({
                    raw: true,
                    where: { id: projectId }
                })
                const puzzleInfo2 = await puzzle.findOne({
                    where: { id: puzzleId }
                })


                const calendarInfo = await calendar.create({
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    day: new Date().getDay(),
                    log: `프로젝트 '${projectInfo.title}'에서 퍼즐 '${puzzleInfo.title}'내용을 수정함.
                    title:${puzzleInfo2.title}, description:${puzzleInfo2.description}`,
                    userId: verifiedToken.id
                })
                res.status(202).json({ "message": "ok" })
            }
        }

    }
}