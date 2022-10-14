import { Logger } from "@guildedts/framework";
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.json({ hello: "world" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    Logger.event(`Server listening on port ${port}!`);
});