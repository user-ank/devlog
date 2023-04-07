const express = require("express");

const postRouter = express.Router();

const storage = require("../../config/cloudinary");
const multer = require("multer");

const {
  createPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  fetchPostCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
  postDetailsCtrl,
  userPostsCtrl,
} = require("../../controller/post/postCtrl");

const {protect} = require('./../../controller/authController');

// const isLogin = require("../../middlewares/isLogin");
postRouter.get("/",fetchPostCtrl);

postRouter.use(protect);
const upload = multer({ storage });
postRouter.get("/:id",userPostsCtrl);
postRouter.post("/",upload.single("image"), createPostCtrl);




// postRouter.get("/likes/:id",toggleLikesPostCtrl);

// postRouter.get("/disLikes/:id",toggleDisLikesPostCtrl);

// //Delete/api/v1/posts/:id
// postRouter.delete("/:id",deletePostCtrl);
// //put/api/v1/posts/:id

// postRouter.put("/:id", upload.single("image"), updatePostCtrl);

// postRouter.get("/:id", postDetailsCtrl);

module.exports = postRouter;
