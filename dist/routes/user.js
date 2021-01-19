"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const usersRouter = express_1.default.Router();
usersRouter.post('/login', controller_1.default.user.login);
usersRouter.post('/signup', controller_1.default.user.signup);
usersRouter.post('/logout', controller_1.default.user.logout);
usersRouter.get('/userinfo', controller_1.default.user.userinfo);
usersRouter.get('/google', controller_1.default.user.google);
usersRouter.post('/google', controller_1.default.user.google);
usersRouter.get('/kakao', controller_1.default.user.kakao);
usersRouter.post('/kakao', controller_1.default.user.kakao);
exports.default = usersRouter;
