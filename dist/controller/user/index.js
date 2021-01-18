"use strict";
//users의 login, signup, logout, userinfo, google, kakao
module.exports = {
    login: require('./login'),
    signup: require('./signup'),
    logout: require('./logout'),
    userinfo: require('./userinfo'),
    google: require('./google'),
    kakao: require('./kakao')
};
