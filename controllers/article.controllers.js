const mongoose = require("mongoose");
const Article = require("../models/article.models");

// ADD NEW ARTICLE
const addArticle = async (req, res) => {
    try {
        const {title, content, tags, author} = req.body;
        if (!title || !content || !tags || !author) {
            return res.status(400).json({message: "PLease fill all the fields"});
        };
        const article = new Article({
            title,
            content,
            tags,
            author,
            publishDate: Date.now(),
        });
        await article.save();
        res.status(200).json({message: "Article added successfully", article});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

// GET ALL ARTICLES || BY FILTERS
const getAllArticles = async (req, res) => {
    try {
        const {tags} = req.query;
        const filters = {};
        if (tags) {
            filters.tags = {$in: tags.split(", ")};
        };
        const articles = await Article.find(filters);
        if (!articles) {
            return res.status(404).json({message: "No Articles Found"});
        };
        res.status(200).json({articles});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

// GET ARTICLE BY ID
const getSingleArticle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        };
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({message: "Article Not Found"});
        };
        res.status(200).json({article});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

// UPDATE ARTICLE
const updateArticle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        };
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({message: "Article Not Found"});
        };
        const updateArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Article Updated Successfully", updateArticle});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

// DELETE ARTICLE
const deleteArticle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        };
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({message: "Article Not Found"});
        };
        res.status(200).json({message: "Article Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

module.exports = {addArticle, getAllArticles, getSingleArticle, updateArticle, deleteArticle};