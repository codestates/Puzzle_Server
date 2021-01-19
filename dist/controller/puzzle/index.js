"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = __importDefault(require("../comment/read"));
const create_1 = __importDefault(require("../home/create"));
const remove_1 = __importDefault(require("../home/remove"));
const update_1 = __importDefault(require("../home/update"));
const puzzleController = {
    create: create_1.default,
    read: read_1.default,
    update: update_1.default,
    remove: remove_1.default,
};
exports.default = puzzleController;
