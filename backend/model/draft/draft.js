const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  subtitle: {
    type: String,
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
  },
  category: {
    type: String,
  },
  creationTime:{
    type:Date
  },
  ContainImage: {
    type: Boolean,
    default: false,
    required: [true, "Please specify that your post contains an image or not"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Author is required"],
  },
  photo: {
    type: String,
  }
});


const Draft = mongoose.model('Draft',draftSchema);

module.exports = Draft;