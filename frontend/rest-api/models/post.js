const mongoose = require("mongoose")

const BlogPostSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  urlTitle: {
    type: String,
    unique: true
  },
  dateTimestamp: Number,
  tags: Array,
  thumbnailImageUrl: String,
  thumbnailImageCaption: String,
  markdownContent: String,
  seoTitleTag: String,
  seoMetaDescription: String
}, {collection: "posts"})

BlogPostSchema.index({id: -1, urlTitle: 1, tags: 'text'})

module.exports = mongoose.model("Post", BlogPostSchema)