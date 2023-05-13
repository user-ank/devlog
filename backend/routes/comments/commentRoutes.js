const express = require("express");
const { protect } = require('./../../controller/authController')

const {
  deleteCommentCtrl,
  updateCommentCtrl,
  getCommentCtrl,
  PostCommentCtrl
} = require("../../controller/comment/commentCtrl");

const commentRouter = express.Router();

commentRouter.use(protect);

//POST/api/v1/comments/
commentRouter.post("/:id", PostCommentCtrl);

//GET/api/v1/comments/:id
commentRouter.get("/:id", getCommentCtrl);

//Delete/api/v1/comments/:id
commentRouter.delete("/:id", deleteCommentCtrl);

//put/api/v1/comments/:id
commentRouter.put("/:id", updateCommentCtrl);

module.exports = commentRouter;
