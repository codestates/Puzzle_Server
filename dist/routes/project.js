"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const projectRouter = express_1.default.Router();
projectRouter.get('/:id', controller_1.default.project.id);
projectRouter.post('/create', controller_1.default.project.create);
projectRouter.post('/invite', controller_1.default.project.invite);
projectRouter.post('/setpuzzle', controller_1.default.project.setpuzzle);
projectRouter.patch('/update', controller_1.default.project.update);
exports.default = projectRouter;
