const {
    generateAccessToken,
    generateRefreshToken
} = require('../tokenFunctions')
const { user } = require('../../models')

module.exports =async () => {


}

//해당 유저와 관련된 project 정보를 응답으로 보내주어야 한다
  //req: GET 요청
  //토큰으로 해당 유저의 id를 얻은 후에 테이블 조인해서 필요한 정보들을 응답한다
    //필요한 정보: 
    //{data: [ { {project1}, {project2}  ]}
/*     {    
        "data": [
                  {
                    // 1번 project.
                    "project":{
                        "id": id,
                        "title": title,
                        "createdAt": createdAt,
                        "isFinish": isFinish,
                    },
                    "images":{
                        "puzzleImg": puzzleImg,
                        "puzzleNum": puzzleNum,
                        "setPuzzleNum": setPuzzleNum,
                    },
                    "teams":  [
                        {
                            "name": name
                            "profileImg": profileImg
                        },
                        {
                            "name": name
                            "profileImg": profileImg
                        },
                        ...
                    ]
                  }, */
    //1.해당 유저의 projects 테이블
    //2.해당 유저가 속해있는 팀(속해있는 팀원의 user테이블의 name과 profileImg)