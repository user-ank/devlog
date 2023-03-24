const express = require("express");
const storage = require("../../config/cloudinary")
const multer=require("multer");
const {
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl, 
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updatePasswordCtrl,
  userProfileByUserNameCtrl,
} = require("../../controller/user/userCtrl");


const isAdmin=require("../../middlewares/isAdmin");

const {signup,login,protect,forgetPassword,resetPassword,updatePassword,checkPassAndUserID,renewAccessToken} = require("../../controller/authController");

const userRouter = express.Router();

const upload=multer({storage});


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forget", forgetPassword);
userRouter.patch("/reset/:token", resetPassword);
userRouter.post("/checkPassAndUserID",checkPassAndUserID)
userRouter.post("/renewAccessToken",renewAccessToken)

userRouter.use(protect);
userRouter.patch("/updatePassword", updatePassword);

userRouter.get("/",usersCtrl);

userRouter.get("/profile/",userProfileCtrl);
userRouter.get("/profileByName/:id",userProfileByUserNameCtrl);
userRouter.get("/profile-viewers/:id",whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id",followingCtrl);
userRouter.get("/unfollowing/:id",unFollowCtrl);

//Delete/api/v1/users/delete-account
userRouter.delete("/delete-account", deleteUserAccountCtrl);

//put/api/v1/users/
userRouter.put("/",updateUserCtrl);

//put/api/v1/users/update-password
userRouter.put("/update-password",updatePasswordCtrl);

userRouter.post("/profile-photo-upload",upload.single('profile'),profilePhotoUploadCtrl);


//put/api/v1/users/admin-block/:id
userRouter.put("/admin-unblock/:id",isAdmin,adminUnBlockUsersCtrl);

//put/api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id",isAdmin,adminBlockUsersCtrl);

module.exports = userRouter;
