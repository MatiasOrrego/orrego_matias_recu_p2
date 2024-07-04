import express from "express";

const app = express()

app.use(express.json())

app.listen(4321, console.log("Servidor funcionando"))