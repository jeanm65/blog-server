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

initDataBase();

const PORT = 8082;

const app = express();

//--------App config-------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

//--------Endpoints-------//
app.get("/articles", getArticle);
app.get("/articles/:id", getArticles);
app.post("/articles", createArticle);
app.put("/articles/:id", updateArticle);
app.delete("/articles/:id", deleteArticle);

app.listen(PORT, () => {
  console.log("server running at port", PORT);
});
