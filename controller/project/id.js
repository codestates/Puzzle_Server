const {
    isAuthorized
} = require('../tokenFunctions')
const { project, user, userPermission,
    puzzle, label, puzzlelabel, userPuzzle,
    image, comment
} = require('../../models')

module.exports = async (req, res) => {
    //home의 프로젝트를 선택한다.
    const verifiedToken = isAuthorized(req)
    const { id } = req.params

    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const connection = await userPermission.findOne({
            where: {
                projectId: id,
                userId: verifiedToken.id
            }
        })
        if (!connection) {
            res.status(404).json({"error": "You are not a member of this project"})
        }else {
            //로그인 유저 정보 불러오기
            const userInfo = await user.findOne({
                raw: true,
                attributes: { exclude: ['password'] },
                where: { id: verifiedToken.id }
            })

            //프로젝트 하나를 가져온다.
            const projectInfo = await project.findOne({
                raw: true,
                where: { id: id }
            })
            // console.log(projectInfo)

            //프로젝트의 팀(초대받은) 사람들을 부른다.
            //프로젝트의 usersData에 user 정보를 입력한다.
            const teamId = await userPermission.findAll({
                raw: true,
                attributes: ["userId"],
                where: { projectId: projectInfo.id }
            })
            const userIds = teamId.map(el => { return el.userId })
            // console.log(userIds)

            const usersInfo = await user.findAll({
                raw: true,
                attributes: { exclude: ['password'] },
                where: { id: userIds }
            })
            // console.log(usersInfo)

            //프로젝트의 퍼즐을 부른다.
            const puzzlesInfo = await puzzle.findAll({
                raw: true,
                where: { projectId: projectInfo.id }
            })
            const puzzleIds = puzzlesInfo.map(el => { return el.id })
            // console.log(puzzlesInfo)

            //퍼즐의 제작자 userId 정보를 부른다.
            const puzzleWriters = await userPuzzle.findAll({
                raw: true,
                where: { puzzleId: puzzleIds },
                attributes: ["userId", "puzzleId"]
            })
            // console.log(puzzleWriters)

            //각 퍼즐에 제작자 정보를 입력한다. 이름만 들어가면 된다.
            puzzlesInfo.forEach(puzzle => {
                puzzleWriters.forEach(writer => {
                    if (puzzle.id === writer.puzzleId) {
                        const { id, name } = usersInfo.find(({ id }) => {
                            return id === writer.userId
                        })
                        puzzle["writer"] = { id: id, name: name }
                    }
                })
            })
            // console.log(puzzlesInfo)

            //프로젝트의 퍼즐에 달린 코멘트를 전부 불러온다.
            //puzzleIds를 가져와 전부 입력한다.
            const commentInfo = await comment.findAll({
                raw: true,
                where: { puzzleId: puzzleIds },
                include: { model: user, attributes: ["name"] }
            })
            // console.log(commentInfo)

            //puzzlesInfo, userInfo 전체정보를 projectInfo에 입력
            projectInfo["puzzlesInfo"] = puzzlesInfo
            projectInfo["teams"] = usersInfo

            res.status(200).json({
                "loginUser": userInfo,
                "project": projectInfo,
                "comment": commentInfo
            })
        }


    }
}