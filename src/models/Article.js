const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // News Title
    description: { type: String, required: true }, // Short description of the article
    content: { type: String, required: true }, // Full article content
    category: {
      type: String,
      required: true,
      enum: ['News', 'Entertainment', 'Movie Reviews'], // Allowed categories
      message: 'Category must be one of the following: News, Entertainment, or Movie Reviews',
    }, // Article category (e.g., News, Entertainment, Sports)
    author: { type: String, required: true }, // Author's name
    image: { type: String, required: true }, // URL or path for the article image
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Article', articleSchema);
