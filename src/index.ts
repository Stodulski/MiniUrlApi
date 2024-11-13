import express from "express";

const app = express();

import connectDB from "./db";

process.loadEnvFile();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

import router from "./routes/main";

app.set("PORT", process.env.PORT || 3000);

app.use(router);

app.listen(app.get("PORT"), (): void => {
    console.log(`Server start at ${app.get("PORT")}`);
});
