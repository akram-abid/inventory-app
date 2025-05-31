const express = require('express');
const moviesRoute = require('./routes/moviesRoute');
const directorsRoute = require('./routes/directorsRoute');
const app = express();

const path = require("node:path");
const main = require('./db/setup-db');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({extended: true}));

app.use("/", moviesRoute);
app.use("/directors", directorsRoute);
const port = process.env.PORT || 5432
app.listen(port, () => {
    console.log("at least i am listening at 3000");
});
