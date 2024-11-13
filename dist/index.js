"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db"));
process.loadEnvFile();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, db_1.default)();
const main_1 = __importDefault(require("./routes/main"));
app.set("PORT", process.env.PORT || 3000);
app.use(main_1.default);
app.listen(app.get("PORT"), () => {
    console.log(`Server start at ${app.get("PORT")}`);
});
