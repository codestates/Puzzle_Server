"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./routes/user"));
const home_1 = __importDefault(require("./routes/home"));
const project_1 = __importDefault(require("./routes/project"));
const comment_1 = __importDefault(require("./routes/comment"));
const puzzle_1 = __importDefault(require("./routes/puzzle"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(cors_1.default({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));
app.use(morgan_1.default('dev'));
app.use(cookie_parser_1.default());
//라우팅 경로
//users, home, project, comment, puzzle 
app.use('/users', user_1.default);
app.use('/home', home_1.default);
app.use('/project', project_1.default);
app.use('/comment', comment_1.default);
app.use('/puzzle', puzzle_1.default);
app.listen(4000, () => {
    console.log('server start...');
});
