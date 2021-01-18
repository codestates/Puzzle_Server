"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./route/user"));
const home_1 = __importDefault(require("./route/home"));
const project_1 = __importDefault(require("./route/project"));
const comment_1 = __importDefault(require("./route/comment"));
const puzzle_1 = __importDefault(require("./route/puzzle"));
const app = express_1.default();
app.use(cors_1.default({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));
app.use(cookie_parser_1.default());
//라우팅 경로
//users, home, project, comment, puzzle 
app.use('/users', user_1.default);
app.use('/home', home_1.default);
app.use('/project', project_1.default);
app.use('/comment', comment_1.default);
app.use('/puzzle', puzzle_1.default);
app.use('/', (req, res) => {
});
app.listen(4000, () => {
    console.log('server start...');
});
