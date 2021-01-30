const {
    isAuthorized
} = require('../tokenFunctions')
const { comment, user } = require('../../models')

module.exports = async (req, res) => {
    console.log("abcd")
    const commentId = req.params.id
    const verifiedToken = isAuthorized(req)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })

    } else {


        //코멘트 정보와 작성자 정보를 가져온다. 어디 퍼즐에서 작성되었는지도 가져온다?
        const commentInfo = await comment.findOne({
            raw: true,
            where: { id: commentId },
            include: { model: user, attributes: ["name"] },

        })
        commentInfo["name"] = commentInfo["user.name"]
        delete commentInfo["user.name"]
        res.status(200).json({ "comment": commentInfo })
    }

}
