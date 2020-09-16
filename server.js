const express = require("express");
const path = require("path");


//const admin = require("firebase-admin");

const app = express();
app.post("/sessionLogin", (req, res) => {

});

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"));
});


app.listen(process.env.PORT||5060, ()=>console.log("server is runnig"));


