const express = require("express");
const storage = require("../../config/cloudinary")
const multer=require("multer");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl, 
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockUsersCtrl,
  unblockUserCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updatePasswordCtrl,
  userProfileByUserNameCtrl,
} = require("../../controller/user/userCtrl");
const isLogin=require("../../middlewares/isLogin");
const isAdmin=require("../../middlewares/isAdmin");
const userRouter = express.Router();

const upload=multer({storage});


userRouter.post("/register", userRegisterCtrl);
userRouter.post("/login", userLoginCtrl);

userRouter.use(isLogin);

userRouter.get("/", usersCtrl);

userRouter.get("/profile/",userProfileCtrl);
userRouter.get("/profileByName/:id",userProfileByUserNameCtrl);
userRouter.get("/profile-viewers/:id",whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id",followingCtrl);
userRouter.get("/unfollowing/:id",unFollowCtrl);

//GET/api/v1/users/blocked/:id
// userRouter.get("/block/:id",blockUsersCtrl);

//GET/api/v1/users/unblock/:id
// userRouter.get("/unblock/:id",unblockUserCtrl);

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
