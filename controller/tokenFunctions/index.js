require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '2h' });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '4h' });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, sameSite: 'none'
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.json({ "accessToken": accessToken, "message": "ok" });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split("Bearer ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);

    } catch (err) {
      // return null if invalid token
      return "fail";
    }
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
