"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDB_1 = require("./config/connectDB");
const config_1 = require("./config");
const tvshows_1 = __importDefault(require("./routes/tvshows"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(tvshows_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello from the outside"
    });
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(config_1.serverPort, () => {
    console.log(`App is running at http://localhost:${config_1.serverPort}`);
    (0, connectDB_1.connectDB)();
});
