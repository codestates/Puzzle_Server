const {
    isAuthorized
} = require('../tokenFunctions')
const { puzzle, userPuzzle, puzzleLabel, userPermission, label, calendar, project } = require('../../models')
//puzzles테이블, userPuzzle테이블, labels 테이블, PuzzleLabels테이블을 채우고, project와 comment에 연결되야 한다.
module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    //labelId: array
    const { title, description, labelId, projectId } = req.body //
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
            res.status(405).json({ "message": "No project ID or not your project" })
        } else {
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

 /*                if (Array.isArray(labelId) && labelId.length > 0) {
                    //배열로 labellId를 입력하고, 그 배열의 길이가 0보다 크다면(요소가 있다면) 이미 존재하는 라벨을 연결한다
                    //usercode 배열과 다르게 중복을 걱정할 필요는 없다 => 있는 걸 가져오는 것일 뿐이기에
                    //labels(where:projectId)에 있는 라벨들 중 하나를 가져오는 것
                    //라벨을 작성하는 곳(label/create)과, 존재하는 라벨을 퍼즐에 붙이는 것은 별개이다
                    //클라이언트에서 labelId를 어떻게 얻는 거지? 
                    //프로젝트 내의 라벨 정보를 받아오는 엔드포인트가 있을 것이다(label/read?)
                    //입력된 labelId가 label 테이블에 정말로 있는지, 우리 프로젝트의 라벨인지 확인은 해야한다

                    labelId.map(async (label) => {
                        const confirmLabel = await label.findOne({
                            where: { id: label, projectId: projectId }
                        })

                        if (!confirmLabel) {
                            res.status(404).json({ "error": "This label does not exist in your project" })
                        } else {
                            const puzzleLabel = await puzzleLabel.create({
                                labelId: label,
                                puzzleId: puzzleInfo.id
                            })
                        }
                    })

                } */
                //labelId가 입력되지 않았을 때도 퍼즐 자체는 생성되어야 한다 

                // 퍼즐 생성 기록을 캘린더에 저장
                const projectInfo = await project.findOne({
                    raw: true,
                    where: { id: projectId }
                })
                const calendarInfo = await calendar.create({
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    day: new Date().getDay(),
                    log: `프로젝트 '${projectInfo.title}'에서 퍼즐 '${puzzleInfo.title}'을 생성함.`,
                    userId: verifiedToken.id
                })

                res.status(200).json({
                    "data": "ok"
                })
            }
        }
    }
}