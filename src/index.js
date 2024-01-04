const express = require("express");
const cors = require("cors");
const initDataBase = require("./config/database");
const {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticle,
  getArticles,
} = require("./controllers/article.controller");
const articleRouter = require("./routes/article.route");

const init = async () => {
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
