require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();

//Initialazing database connection
const initDatabase = require("./database");

//Using middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Using the routes
app.use(require("./routes/template.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/userbooks.routes"));
app.use(require("./routes/social.routes"));

//To deploy a react router app build with an express server, this must be here forever
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"), (err) => {
    if (err) {
      res.status(500).send("error");
      console.log(err);
    }
  });
});

//Initialazing the server
let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
