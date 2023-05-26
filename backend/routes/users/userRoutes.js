const express = require("express");
const storage = require("../../config/cloudinary")
const multer=require("multer");
const {
  updateProfileCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl, 
  whoViewedMyProfileCtrl,
  FollowCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  userProfileByUserNameCtrl,
  BookmarkedPostCtrl
} = require("../../controller/user/userCtrl");


// const isAdmin=require("../../middlewares/isAdmin");

const {userValidator,validate} = require('./../../middlewares/validator');

const {signup,login,protect,forgetPassword,resetPassword,updatePassword,checkPassAndUserID,renewAccessToken,logOut,verifyEmail} = require("../../controller/authController");

const userRouter = express.Router();

const upload=multer({storage});


userRouter.post("/signup",userValidator,validate,signup);
userRouter.post('/verifyEmail',verifyEmail);
userRouter.post("/login", login);
userRouter.post("/forget", forgetPassword);
userRouter.patch("/reset/:token", resetPassword);
userRouter.post("/checkPassAndUserID",checkPassAndUserID)
userRouter.get("/renewAccessToken",renewAccessToken)
userRouter.delete("/logOut", logOut);

userRouter.use(protect);

userRouter.patch("/updatePassword", updatePassword);
userRouter.put("/updateMyProfile", updateProfileCtrl)

userRouter.get("/",usersCtrl);

userRouter.get("/profile/",userProfileCtrl);
userRouter.get("/profileByName/:id",userProfileByUserNameCtrl);
userRouter.get("/profile-viewers/:id",whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.post("/following/:id",FollowCtrl);
userRouter.get("/bookmarkedPost",BookmarkedPostCtrl)




//GET/api/v1/users/blocked/:id
// userRouter.get("/block/:id",blockUsersCtrl);

//GET/api/v1/users/unblock/:id
// userRouter.get("/unblock/:id",unblockUserCtrl);


//Delete/api/v1/users/delete-account
// userRouter.delete("/delete-account", deleteUserAccountCtrl);

//put/api/v1/users/
// userRouter.put("/",updateUserCtrl);


// userRouter.post("/profile-photo-upload",upload.single('profile'),profilePhotoUploadCtrl);


//put/api/v1/users/admin-block/:id
// userRouter.put("/admin-unblock/:id",isAdmin,adminUnBlockUsersCtrl);

//put/api/v1/users/admin-block/:id
// userRouter.put("/admin-block/:id",isAdmin,adminBlockUsersCtrl);




module.exports = userRouter;
