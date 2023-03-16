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
} = require("../../controller/post/postCtrl");

const isLogin = require("../../middlewares/isLogin");

//file upload middleware
const upload = multer({ storage });

postRouter.get("/",fetchPostCtrl);

postRouter.use(isLogin);

postRouter.post("/",upload.single("image"), createPostCtrl);


postRouter.get("/likes/:id",toggleLikesPostCtrl);

postRouter.get("/disLikes/:id",toggleDisLikesPostCtrl);

//Delete/api/v1/posts/:id
postRouter.delete("/:id",deletePostCtrl);
//put/api/v1/posts/:id

postRouter.put("/:id", upload.single("image"), updatePostCtrl);

postRouter.get("/:id", postDetailsCtrl);

module.exports = postRouter;
