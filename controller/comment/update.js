const {
    isAuthorized
} = require('../tokenFunctions')
const { comment } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const commentId = req.params.id
    const { description } = req.body
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //자신이 작성한 코켄트만 업데이트할 수 있다.
        const commentInfo = await comment.update({
            description: description
        }, {
            where: { id: commentId, userId: verifiedToken.id }
        })
        //commentInfo = [0]이면 업데이트 완료, [1]이면 업데이트 실패

        if (!commentInfo[0]) {//0이면 true, 0이 아니면 false
            res.status(404).json({ "error": "can't update comment" })
        } else {
            res.status(200).json({ "message": "ok" })
        }
    }
}