const Article = require("../models/article.model");

const createArticle = async (req, res) => {
  const { title, content } = req.body;

  const newArticle = new Article({
    title,
    content,
  });

  const article = await newArticle.save();

  return res.status(200).json({ success: true, article });
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findByIdAndDelete(id);

  return res.status(200).json({ success: true, article });
};

const updateArticle = async (req, res) => {
  // try {
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
//   } catch (error) {
//     return res.status(404).json({ success: false, error: error.message });
  }
// // };

const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!getArticle) {
      throw new Error("article with the id " + id + " does not exist");
    }
    return res.status(200).json({ success: true, article });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const getArticles = async (req, res) => {
  // throw new Error("Hi from server !!");
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
