"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentRouter = express_1.default.Router();
commentRouter.get('/home', (req, res) => {
    return res.json("Ok");
});
exports.default = commentRouter;
