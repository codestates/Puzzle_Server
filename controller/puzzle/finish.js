const {
  isAuthorized
} = require('../tokenFunctions')
const { puzzle, project, userPuzzle } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const puzzleId = req.params.puzzleid;

    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    }else {
        const connection = await userPuzzle.findOne({
          where: {
            userId: verifiedToken.id,
            puzzleId: puzzleId
          }
        })
        //퍼즐 작성자만 변경할 수 있음 
        if (!connection) {
          res.status(404).json({"message": "You are not the creator of this puzzle"})
        }else {
          //1. 완료상태를 변경할 퍼즐을 찾아서, 완료상태를 변경한다(true면 fase로 false면 true로)
          const targetPuzzle = await puzzle.findOne({
            where: {id: puzzleId}
          })
          if (!targetPuzzle) {
            res.status(405).json({"message": "The puzzle does not exist in the DB"})
          }else {
            await puzzle.update({isFinish: !targetPuzzle.isFinish },{
              where: {id: puzzleId},
            })
          //2. 프로젝트 내의 모든 퍼즐이 완료되었는지 확인
            //2.1 puzzleNum과 puzzleFinished를 가져온다
            const puzzleNum = await puzzle.findAll({
              where: {projectId: targetPuzzle.projectId},
              raw: true
            }).length

            const puzzleFinished = await puzzle.findAll({
              where: {projectId: targetPuzzle.projectId, isFinish: true},
              raw: true
            }).length

            console.log(puzzleNum)
            console.log(puzzleFinished)
            //2.2 프로젝트 내의 모든 퍼즐이 완료됐으면, 프로젝트도 완료상태로 바꾼다
            if (puzzleNum === puzzleFinished) {
              await project.update({isFinish : true}, {
                where: {id: targetPuzzle.projectId}
              })
            }else {
              await project.update({isFinish: false}, {
                where: {id: targetPuzzle.projectId}
              })
            }
          }
        }
        res.status(202).json({"message": "isFinish modify success!"})
    }

}

//puzzleId로 해당 puzzle 찾는다(findOne) (v)
//해당 puzzle.isFinish가 true면 false로, false면 true로 update (v)
//프로젝트 내의 총 퍼즐 갯수(puzzleNum)과 완료된 퍼즐 갯수(puzzleFinished)를 가져온다
  //1. prams로 가져온 puzzleId로 해당 puzzle 레코드를 가져온다
  //2. puzzles.projectId (profit!)
  //puzzleNum: findAll로 puzzles에서 특정 projectId를 갖고 있는 레코드들을 배열로 가져오면 그 배열의 길이가 puzzleNum이기 때문
  //puzzleFinished: findAll로 puzzle테이블에서 특정 projectId를 갖고 있으며 동시에 puzzles.isFinish가 true인 레코드들을 배열로 가져오면 그 배열의 길이가 puzzleFinished이다.
  //3. puzzleNum === puzzleFinishe라면 프로젝트내의 모든 퍼즐이 완료되었다는 말이므로 프로젝트도 완료상태로 변경한다