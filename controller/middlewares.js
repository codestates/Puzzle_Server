exports.isLoggedIn = (req, res, next) => {
  if (req.header('Authentication').split(' ')[1].length !== 0) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};
//로그인했는지 확인하려면?
  //헤더에 토큰이 담겨있는지 확인 req.headers('Authentication')

exports.isNotLoggedIn = (req, res, next) => {
  if (req.header('Authentication').split(' ')[1].length === 0) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
