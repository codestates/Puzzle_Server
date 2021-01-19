"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const puzzleRouter = express_1.default.Router();
puzzleRouter.post('/create', controller_1.default.puzzle.create);
puzzleRouter.get('/read/:id', controller_1.default.puzzle.read);
puzzleRouter.patch('/update', controller_1.default.puzzle.update);
puzzleRouter.delete('/delete', controller_1.default.puzzle.remove);
exports.default = puzzleRouter;
