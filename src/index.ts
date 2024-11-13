import express from "express";

const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

import router from "./routes/main";

app.set("PORT", process.env.PORT || 3000);

app.use(router);

app.listen(app.get("PORT"), (): void => {
    console.log(`Server start at ${app.get("PORT")}`);
});
