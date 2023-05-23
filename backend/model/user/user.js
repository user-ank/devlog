const mongoose = require("mongoose");
const Post = require("../post/post");
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name! ']
    },

    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    profilePhoto: { 
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },
    Twitter_Profile: {
      type: String,
    },
    GitHub_Profile:{
      type: String,
    },
    StackOverflow_Profile:{
      type: String,
    },
    Instagram_Profile:{
      type: String,
    },
    Facebook_Profile:{
      type: String,
    },
    Website_URL:{
      type: String,
    },
    LinkedIn_URL:{
      type: String,
    },
    YouTube_Channel:{
      type: String,
    },
    Profile_Tagline:{
      type: String,
    },
    Profile_Bio:{
      type: String,
      max: 250
    },
    Tech_Stack:{
      type: String,
      max: 100
    },
    Location:{
      type: String,
    },
    Available_for:{
      type: String,
      max: 250
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    like:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      }
    ],
    // bookmarks:[
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post"
    //   }
    // ],
    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    isVerified:{
      type: Boolean,
      required: true,
      default: false
    },
    Bookmarked_Post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }]

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("post-count").get(function () {
  return this.posts.length;
});

userSchema.virtual("followers-count").get(function () {
  return this.followers.length;
});


userSchema.virtual("following-count").get(function () {
  return this.following.length;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
}



const User = mongoose.model("User", userSchema);

module.exports = User;
