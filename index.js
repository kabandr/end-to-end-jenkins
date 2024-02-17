import express from "express";
import { books } from "./books.js";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/books", (req, res) => {
    try {
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;