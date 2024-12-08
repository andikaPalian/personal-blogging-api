const express = require("express");
const { addArticle, getAllArticles, getSingleArticle, updateArticle, deleteArticle } = require("../controllers/article.controllers");
const router = express.Router();

router.post("/add-article", addArticle);
router.get("/get-articles", getAllArticles);
router.get("/get-article/:id", getSingleArticle);
router.put("/update-article/:id", updateArticle);
router.delete("/delete-article/:id", deleteArticle);

module.exports = router;