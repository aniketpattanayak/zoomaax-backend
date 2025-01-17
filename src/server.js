const express = require('express');
const Article = require('../models/Article'); // Import Article model
const router = express.Router();

// POST a new article
router.post('/', async (req, res) => {
  try {
    const { title, description, content, category, author, image } = req.body;

    if (!title || !description || !content || !category || !author || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newArticle = new Article({
      title,
      description,
      content,
      category,
      author,
      image,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article.', error: error.message });
  }
});

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles.', error: error.message });
  }
});

// PUT (update) an article by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article.', error: error.message });
  }
});

module.exports = router;
