"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("./home"));
const search_1 = __importDefault(require("./search"));
const create_1 = __importDefault(require("./create"));
const update_1 = __importDefault(require("./update"));
const remove_1 = __importDefault(require("./remove"));
const homeController = {
    home: home_1.default,
    search: search_1.default,
    create: create_1.default,
    update: update_1.default,
    remove: remove_1.default,
};
exports.default = homeController;
