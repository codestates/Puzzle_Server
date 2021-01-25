const {
    isAuthorized
} = require('../tokenFunctions')
const { project, user, userPermission,
    puzzle, label, puzzlelabel, userPuzzle,
    image,
} = require('../../models')

module.exports = async (req, res) => {
    //home의 프로젝트를 선택한다.
    const verifiedToken = isAuthorized(req)
    const { id } = req.params

    if (!verifiedToken) {
        res.status(404).json({ "error": "can't find main page" })
    } else {
        //프로젝트, 팀, 퍼즐, 이미지 ,라벨이 필요하다. 라벨은 퍼즐라벨, 이미지는 퍼즐이미지
        //코멘트 필요
        //프로젝트 하나를 가져온다.
        const projectInfo = await project.findOne({
            raw: true,
            where: { id: id }
        })
        console.log(projectInfo)

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
        console.log(puzzlesInfo)

        //퍼즐의 제작자 정보를 부른다.
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
                    puzzlesInfo["userData"] = usersInfo.find(({ id, name }) => {
                        return id === writer.userId
                    })
                }
            })
        })
        console.log(puzzlesInfo)

        res.status(200).json({
            "data": projectInfo
        })

    }
}