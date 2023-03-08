"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// database import 
require("./database/dbConnection");
dotenv_1.default.config();
// routes import 
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3025;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// user routes 
app.use('/auth', auth_1.default);
app.use('/user', user_1.default);
app.get('/', (req, res, next) => {
    res.status(200).json({ message: "All greate!" });
});
app.listen(PORT, () => {
    console.log(`Server is started at http://localhost:${PORT}`);
});
