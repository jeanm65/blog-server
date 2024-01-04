const {
  deleteArticle,
  updateArticle,
  createArticle,
  getArticles,
  getArticle,
} = require("../controllers/article.controller");

const express = require("express");

const articleRouter = express.Router();

//--------Endpoints-------//
articleRouter
  .get("/:id", getArticle)
  .get("/", getArticles)
  .post("/", createArticle)
  .put("/:id", updateArticle)
  .delete("/:id", deleteArticle);

module.exports = articleRouter;
