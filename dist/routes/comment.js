"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const commentRouter = express_1.default.Router();
commentRouter.post('/create', controller_1.default.comment.create);
commentRouter.get('/read', controller_1.default.comment.read);
commentRouter.patch('/update', controller_1.default.comment.update);
commentRouter.delete('/delete', controller_1.default.comment.remove);
exports.default = commentRouter;
