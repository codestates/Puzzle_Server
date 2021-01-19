"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const signup_1 = __importDefault(require("./signup"));
const logout_1 = __importDefault(require("./logout"));
const userinfo_1 = __importDefault(require("./userinfo"));
const google_1 = __importDefault(require("./google"));
const kakao_1 = __importDefault(require("./kakao"));
const userController = {
    login: login_1.default,
    signup: signup_1.default,
    logout: logout_1.default,
    userinfo: userinfo_1.default,
    google: google_1.default,
    kakao: kakao_1.default
};
exports.default = userController;
