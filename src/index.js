const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const initDataBase = require("./config/database");
const articleRouter = require("./routes/article.route");

const init = async () => {
  await dotenv.config({ path: path.join(__dirname, "..", ".env.local") });
  //----------connected to database before launching the server-------//
  await initDataBase();
  const PORT = 8082;
  const app = express();

  //--------App config-------//
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(express.static("public"));

  app.use("/articles", articleRouter);

  app.listen(PORT, () => {
    console.log("server running at port", PORT);
  });
};

init();
