import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

import connectDB from "./db";

import router from "./routes/main";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectDB();

app.set("PORT", process.env.PORT || 3000);

app.use(router);

app.listen(app.get("PORT"), (): void => {
    console.log(`Server start at ${app.get("PORT")}`);
});
