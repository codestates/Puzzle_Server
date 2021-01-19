"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const homeRouter = express_1.default.Router();
homeRouter.get('/', controller_1.default.home.home);
homeRouter.post('/serach', controller_1.default.home.search);
homeRouter.post('/create', controller_1.default.home.create);
homeRouter.patch('/update', controller_1.default.home.update);
homeRouter.delete('/delete', controller_1.default.home.remove);
exports.default = homeRouter;
