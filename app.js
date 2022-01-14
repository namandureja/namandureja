const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", require("./routes/home.js"));

app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listening on port ${process.env.PORT||3000}`);
});