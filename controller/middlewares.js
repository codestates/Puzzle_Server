exports.isLoggedIn = (req, res, next) => {
  const authorization = req.headers["authorization"]
  if (!authorization) {
    return null;
  }
  const token = authorization.split("Bearer ")[1]; 
  try {
    next();
  } catch (err) {
    return "fail";
  }

};
//로그인했는지 확인하려면?
  //헤더에 토큰이 담겨있는지 확인 req.headers('Authentication')

exports.isNotLoggedIn = (req, res, next) => {
  if (req.headers('Authorization').split(' ')[1].length === 0) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
