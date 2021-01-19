"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const home_1 = __importDefault(require("./home"));
const project_1 = __importDefault(require("./project"));
const comment_1 = __importDefault(require("./comment"));
const puzzle_1 = __importDefault(require("./puzzle"));
const controller = {
    user: {
        login: user_1.default.login,
        signup: user_1.default.signup,
        logout: user_1.default.logout,
        userinfo: user_1.default.userinfo,
        google: user_1.default.google,
        kakao: user_1.default.kakao,
    },
    home: {
        home: home_1.default.home,
        search: home_1.default.search,
        create: home_1.default.create,
        update: home_1.default.update,
        remove: home_1.default.remove,
    },
    project: {
        id: project_1.default.id,
        create: project_1.default.create,
        invite: project_1.default.invite,
        setpuzzle: project_1.default.setpuzzle,
        update: project_1.default.update
    },
    comment: {
        create: comment_1.default.create,
        read: comment_1.default.read,
        update: comment_1.default.update,
        remove: comment_1.default.remove,
    },
    puzzle: {
        create: puzzle_1.default.create,
        read: puzzle_1.default.read,
        update: puzzle_1.default.update,
        remove: puzzle_1.default.remove,
    }
};
exports.default = controller;
