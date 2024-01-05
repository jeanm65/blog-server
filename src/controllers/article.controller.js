const Article = require("../models/article.model");

const createArticle = async (req, res) => {
  const { title, content } = req.body;

  const article = new Article({
    title,
    content,
  });

  const newArticle = await article.save();

  return res.status(200).json({ success: true, newArticle });
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const deletedArticle = await Article.findByIdAndDelete(id);

  return res.status(200).json({ success: true, deletedArticle });
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    {
      title,
      content,
    },
    { new: true }
  );

  return res.status(200).json({ success: true, article: updatedArticle });
};

const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const getArticle = await Article.findById(id);

    if (!getArticle) {
      throw new Error("article with the id " + id + " does not exist");
    }

    return res.status(200).json({ success: true, getArticle });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const getArticles = async (req, res) => {
  const articles = await Article.find({});
  return res.status(200).json({ success: true, articles });
};

module.exports = {
  getArticle,
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
};
