"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = __importDefault(require("./id"));
const create_1 = __importDefault(require("./create"));
const invite_1 = __importDefault(require("./invite"));
const setpuzzle_1 = __importDefault(require("./setpuzzle"));
const update_1 = __importDefault(require("./update"));
const projectController = {
    id: id_1.default,
    create: create_1.default,
    invite: invite_1.default,
    setpuzzle: setpuzzle_1.default,
    update: update_1.default,
};
exports.default = projectController;
