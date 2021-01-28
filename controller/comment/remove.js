const {
    isAuthorized
} = require('../tokenFunctions')
const { comment, user } = require('../../models')

module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const commentId = req.params.id
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {
        //작성자만 코멘트를 지울 수 있다.
        const commentInfo = await comment.destroy({
            where: { id: commentId, userId: verifiedToken.id }
        })
        //성공하면 1, 실패하면 0이 나온다.

        if (!commentInfo) {//0이면 true가 되는데 !가 붙어서 false가 된다.
            res.status(404).json({ "error": "can't delete comment" })
        } else {//1이면 false가 되는데 !가 붙어 true가 된다.
            res.status(200).json({ "message": "ok" })
        }
    }
}