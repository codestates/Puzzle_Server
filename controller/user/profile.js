const { user } = require('../../models')
const { isAuthorized } = require('../tokenFunctions')
module.exports = async (req, res) => {
  const verifiedToken = isAuthorized(req);
  console.log('test')
  console.log(verifiedToken)
  if (!verifiedToken) {
    res.json({ "message": "there isn't token or invalid token" })
  } else { //verifiedToken = {id: 유저테이블 id, name: 유저테이블의 name}
    const { id } = verifiedToken
    const updatedUser = await user.update({
      profileImg: req.file.location
    }, {
      where: { id: id }
    });

    if (!updatedUser) {
      res.json({ "message": "There are no users with matching information" })
    } else {
      res.json({ "url": req.file.location, "message": "image upload success" });
    }
  }
}


