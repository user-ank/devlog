const User = require("../../model/user/user");
const Category = require("../../model/category/category");
const Comment = require("../../model/comment/comment");
const Post = require("../../model/post/post");
const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { findById } = require("../../model/post/post");
const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/AppError");


const userProfileCtrl = async (req, res, next) => {
  // console.log(req.userAuth);

  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};


const getUserProfileCtrl = catchAsync(async (req, res) => {
  const username = req.params.username;
  const user = await User.find({userName:username});

  // console.log(user[0].name);

  res.status(200).send({
    status: "success",
    data: {
      name: user[0].name,
      profilePhoto: user[0].profilePhoto,
      twitter: user[0].Twitter_Profile,
      gitHub: user[0].GitHub_Profile,
      stackOverflow: user[0].StackOverflow_Profile,
      instagram: user[0].Instagram_Profile,
      facebook: user[0].Facebook_Profile,
      website: user[0].Website_URL,
      linkedIn: user[0].LinkedIn_URL,
      youtube: user[0].YouTube_Channel,
      profileTagline: user[0].Profile_Tagline,
      profileBio: user[0].Profile_Bio,
      techStack: user[0].Tech_Stack,
      location: user[0].Location,
      available_for: user[0].Available_for,
      followers: user[0].followers.length,
      following: user[0].following.length,
      posts: user[0].posts.length,
      userAward: user[0].userAward,
      creationTime: user[0].creationTime,
    }
  });

});

const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const userWhoViewed = await User.findById(req.userAuth);

    //check if user and userwhoviewed are found

    if (user && userWhoViewed) {
      //check if user and userwhoviewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );

      if (isUserAlreadyViewed) {
        return next(appErr("you already viewed this profile"));
      } else {
        user.viewers.push(userWhoViewed._id);

        await user.save();
        res.json({
          status: "success",
          data: "you have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const FollowCtrl = catchAsync(async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const userWhoFollowed = await User.findById(req.user);

  if (!userWhoFollowed.following.includes(req.params.id)) {
    userWhoFollowed.following.push(req.params.id);
    userToFollow.followers.push(req.user);
    await userWhoFollowed.save();
    await userToFollow.save();

    res.status(200).send({
      message: "Follow Successfull.🙂🙂",
    });
  } else {
    userWhoFollowed.following = userWhoFollowed.following.filter(
      (item) => item.toString() !== userToFollow._id.toString()
    );
    userToFollow.followers = userToFollow.followers.filter(
      (item) => item.toString() !== userWhoFollowed._id.toString()
    );
    await userWhoFollowed.save();
    await userToFollow.save();

    res.status(200).send({
      message: "Successfully Unfollow !!",
    });
  }
});



//block
const blockUsersCtrl = async (req, res, next) => {
  try {
    //1. Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    //2. Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);
    //3. Check if userToBeBlocked and userWhoBlocked are found
    if (userWhoBlocked && userToBeBlocked) {
      //4. Check if userWhoUnfollowed is already in the user's blocked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      }
      //7.Push userToBleBlocked to the userWhoBlocked's blocked arr
      userWhoBlocked.blocked.push(userToBeBlocked._id);
      //8. save
      await userWhoBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully blocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//unblock
const unblockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);
    //2. find the user who is unblocking
    const userWhoUnBlocked = await User.findById(req.userAuth);
    //3. check if userToBeUnBlocked and userWhoUnblocked are found
    if (userToBeUnBlocked && userWhoUnBlocked) {
      //4. Check if userToBeUnBlocked is already in the arrays's of userWhoUnBlocked
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("You have not blocked this user"));
      }
      //Remove the userToBeUnblocked from the main user
      userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
        (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
      );
      //Save
      await userWhoUnBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully unblocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);

    if (!userToBeBlocked) {
      return next(appErr("user not found"));
    }

    userToBeBlocked.isBlocked = true;

    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully blocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminUnBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeUnBlocked = await User.findById(req.params.id);

    if (!userToBeUnBlocked) {
      return next(appErr("user not found"));
    }

    userToBeUnBlocked.isBlocked = false;

    await userToBeUnBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully unblocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const usersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteUserAccountCtrl = async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.userAuth);

    await Post.deleteMany({ user: req.userAuth });
    await Comment.deleteMany({ user: req.userAuth });
    await Category.deleteMany({ user: req.userAuth });
    await userToDelete.delete();
    res.json({
      status: "success",
      data: "u have successfully deleted your account ",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};



const updateProfileCtrl = catchAsync(async (req, res, next) => {
  const {
    name,
    Twitter_Profile,
    GitHub_Profile,
    StackOverflow_Profile,
    Instagram_Profile,
    Facebook_Profile,
    Website_URL,
    LinkedIn_URL,
    YouTube_Channel,
    Profile_Tagline,
    Profile_Bio,
    Tech_Stack,
    Location,
    Available_for,
  } = req.body;

  const arr = Tech_Stack.split(',')

  const updatedProfile = await User.findByIdAndUpdate(
    req.user,
    {
      name: name,
      Twitter_Profile: Twitter_Profile,
      GitHub_Profile: GitHub_Profile,
      StackOverflow_Profile: StackOverflow_Profile,
      Instagram_Profile: Instagram_Profile,
      Facebook_Profile: Facebook_Profile,
      Website_URL: Website_URL,
      LinkedIn_URL: LinkedIn_URL,
      YouTube_Channel: YouTube_Channel,
      Profile_Tagline: Profile_Tagline,
      Profile_Bio: Profile_Bio,
      Tech_Stack: arr,
      Location: Location,
      Available_for: Available_for,
    },
    { new: true }
  );

  res.status(201).send({
    data: "Successfully your account is updated 🙂🙂🙂"
  });
});

const profilePhotoUploadCtrl = catchAsync(async (req, res, next) => {

    if (req.file) {
      await User.findByIdAndUpdate(
        req.user,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).send({
        status: "success",
        data: "you have successfully uploaded profile photo ",
      });
    }
    else{
      res.status(404).send({
        data: "Please provide profile photo.",
      });
    }
});

// isme sirf abhi summary bhejna hai ..ye kaam krna hai ankit tee ko
const BookmarkedPostCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate("Bookmarked_Post");


    const B_POST = user.Bookmarked_Post;




    let doc = [];

    await Promise.all(user.Bookmarked_Post.map(async (obj) => {

      const usr = await User.findById(obj.user);
      

      let likeed = false;
      for (let index = 0; index < obj.likes.length; index++) {
        if (obj.likes[index] == user.id) {
          likeed = true;
          break;
        }

      }



      if (usr) {
        doc.push({
          title: obj.title,
          id: obj._id,
          likeCnt: obj.likes.length,
          content: obj.summary,
          minRead: obj.minute_read,
          photo: obj.photo,
          isBookmarked: true,
          isLiked: likeed,
          user: {
            userName: usr.userName,
            name: usr.name,
            userId: usr._id,
            profilePhoto: usr.profilePhoto,
          },
          updatedAt: obj.updatedAt,
          ContainImage: obj.ContainImage,
        });
      }
    }));



    res.json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  updateProfileCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl,
  whoViewedMyProfileCtrl,
  FollowCtrl,
  blockUsersCtrl,
  unblockUserCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  getUserProfileCtrl,
  BookmarkedPostCtrl,
  profilePhotoUploadCtrl
};
