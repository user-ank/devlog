const Comment = require('../../model/comment/comment');
const User = require('../../model/user/user');
const Post = require('../../model/post/post');
const appErr = require('../../utils/appErr');
const AppError = require('./../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');


// //POST/api/v1/comments/
// const postCommentCtrl = async (req, res, next) => {
//   const { description } = req.body;
//   try {

//     const post = await Post.findById(req.params.id);


//     //creating comment

//     const comment = await Comment.create({

//       post: post._id,
//       description,
//       user: req.userAuth,
//     });

//     post.comments.push(comment._id);


//     //ab comment user me bhi daal dete hain
//     const user = await User.findById(req.userAuth);
//     user.comments.push(comment._id);

//     //save
//     //validation disable krna prega save krne ke pehle .. nhi to sirf comment nho krne dega ...
//     await user.save({ validateBeforeSave: false });
//     await post.save({ validateBeforeSave: false });

//     res.json({
//       status: "success",
//       data: comment,
//     });
//   } catch (error) {
//     res.json(error.message);
//   }
// }


const PostCommentCtrl = catchAsync(async (req, res, next) => {
  const { description } = req.body;
  const post = await Post.findById(req.params.id);
  // console.log(req.user);
  const comment = await Comment.create({
    post: post._id,
    description,
    user: req.user,
  });

  post.comments.push(comment._id);
  const user = await User.findById(req.user);
  user.comments.push(comment._id);

  await user.save({ validateBeforeSave: false });
  await post.save({ validateBeforeSave: false });

  res.status(201).send({
    status: "success",
    data: comment,
  });

})




//GET/api/v1/comments/:id
const getCommentCtrl = async (req, res, next) => {
  // try {

  //   const comment = await Comment.findById(req.params.id);

  //   res.json({
  //     status: "success",
  //     data: comment,
  //   });
  // } catch (error) {
  //   next(appErr(error.message))
  // }



}



//Delete/api/v1/comments/:id
const deleteCommentCtrl = catchAsync(async (req, res, next) => {

  const comment = await Comment.findById(req.params.id);

  console.log(comment.user.toString());
  console.log("Hiiiiii");
  console.log(req.user.toString());


  if (comment.user.toString() !== req.user.toString()) {
    return next(new AppError("you are not allowed to delete this comment ", 403));
  }

  await Post.findByIdAndUpdate(comment.post, { $pull: { "comments": comment.id } }, { safe: true, upsert: true, new: true })
  await User.findByIdAndUpdate(comment.user, { $pull: { "comments": comment.id } }, { safe: true, upsert: true, new: true })
  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: "comment deleted succesfully",
  });

})

//put/api/v1/comments/:id
const updateCommentCtrl = async (req, res) => {
  const { description } = req.body;
  try {

    const comment = await Comment.findById(req.params.id);

    //check kr rhe hain ki yee post iss user se belong krta hai ki nhi
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to update this comment ", 403));
    }

    const category = await Comment.findByIdAndUpdate(req.params.id, { description }, { new: true, runValidators: true })
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.json(error.message);
  }
}



module.exports = { getCommentCtrl, deleteCommentCtrl, updateCommentCtrl, PostCommentCtrl }




