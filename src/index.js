const express = require("express");
const cors = require("cors");
const PORT = 8082;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));

const articles = [
  {
    id: 1,
    title: "my super article 1",
  },
  {
    id: 2,
    title: "my super article 2",
  },
  {
    id: 3,
    title: "my super article 3",
  },
];

app.get("/articles", (req, res) => {
  return res.status(200).json({ success: true, articles });
});

app.get("/articles/:id", (req, res) => {
  try {
    const { id } = req.params;
    const getArticle = articles.find((article) => article.id === +id);

    if (!getArticle) {
      throw new Error("article with the id " + id + " does not exist");
    }

    return res.status(200).json({ success: true, getArticle });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/articles", (req, res) => {
  const { title } = req.body;

  const lastArticle = articles[articles.length - 1];
  const newArticle = { id: lastArticle.id + 1, title: title };

  articles.push(newArticle);

  return res.status(200).json({ success: true, articles });
});

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updatedArticle = articles.find((article) => article.id === +id);

  if (!updatedArticle) {
    throw new Error(`article with id: ${id} do not exist`);
  }

  updatedArticle.title = title;

  return res.status(200).json({ success: true, article: updatedArticle });
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;

  const deletedArticleIndex = articles.findIndex(
    (article) => article.id === +id
  );

  articles.splice(deletedArticleIndex, 1);

  return res.status(200).json({ success: true, articles });
});

// app.put("/articles/:id", (req, res) => {
//   const articleId = parseInt(req.params.id);
//   const updatedArticle = Object.assign({}, req.body);

//   // Check if the article exists
//   if (!articles.find((article) => article.id === articleId)) {
//     return res.status(404).json({ success: false, message: "Article not found" });
//   }

//   // Update the article in the array
//   articles.forEach((article, index) => {
//     if (article.id === articleId) {
//       articles[index] = updatedArticle;
//     }
//   });

//   // Return success response
//   return res.status(200).json({ success: true, article: updatedArticle });
// });

app.listen(PORT, () => {
  console.log("server running at port", PORT);
});
