const {
  deleteArticle,
  updateArticle,
  createArticle,
  getArticles,
  getArticle,
} = require("../controllers/article.controller");

const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");

const articleRouter = express.Router();

//--------Endpoints-------//
articleRouter
  .get("/:id", authenticate, getArticle)
  .get("/", authenticate, getArticles)
  .post("/", authenticate, createArticle)
  .put("/:id", authenticate, updateArticle)
  .delete("/:id", authenticate, deleteArticle);

module.exports = articleRouter;
