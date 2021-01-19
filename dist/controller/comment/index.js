"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const remove_1 = __importDefault(require("./remove"));
const update_1 = __importDefault(require("./update"));
const read_1 = __importDefault(require("./read"));
const commentController = {
    create: create_1.default,
    read: read_1.default,
    update: update_1.default,
    remove: remove_1.default,
};
exports.default = commentController;
