import login from './login'
import signup from './signup'
import logout from './logout'
import userinfo from './userinfo'
import google from './google'
import kakao from './kakao'

const userController = {
    login: login,
    signup: signup,
    logout: logout,
    userinfo: userinfo,
    google: google,
    kakao: kakao
}

export default userController