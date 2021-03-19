const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken
} = require('../tokenFunctions')
const { user } = require('../../models')
const sha256 = require('../lib/SHA256')
require('dotenv').config()

module.exports = async (req, res) => {
  // "email": "guest@email.com",
  // "password": "1234"
  const { guestEmail, guestPassword  } = req.body
  const findUser = await user.findOne({
      where: {
          email: guestEmail,
      }
  })
  if (!findUser) {
      res.status(404).json({ "message": "invalid user info" })
  }

  const userInfo = await user.findOne({
      raw: true,
      where: {
          email: guestEmail,
          password: sha256(guestPassword + process.env.SALT)
      }
  })
  // console.log(userInfo)
  if (!userInfo) {
      res.status(404).json({ "message": "invalid user info" })
  } else {
      const obj = { id: userInfo.id, email: userInfo.email }
      const accessToken = generateAccessToken(obj);
      const refreshToken = generateRefreshToken(obj);

      sendRefreshToken(res, refreshToken)
      sendAccessToken(res, accessToken)
  }
}
