const User = require('./../model/user/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const schedule = require('node-schedule');
const { LOADIPHLPAPI } = require('dns');
const UserToken = require('./../model/user/userToken');
const verifyRefreshToken = ('./../utils/varifyRefreshToken');
const EmailVerificationToken = require('./../model/user/EmailVarificationToken');
const { genarateOTP, sendEmail } = require("./../utils/email");
const { isValidObjectId } = require("mongoose");

const signToken = (id, secret, expireTime) => {
    return jwt.sign({ id }, secret, {
        expiresIn: expireTime
    });
}

const createSendToken = async (user, msg,statusCode, res) => {
    const accessToken = signToken(user._id, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = signToken(user._id, process.env.JWT_RFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();
    await new UserToken({ userId: user._id, token: refreshToken }).save();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
        secure: true
    }

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    user.password = undefined;

    res.cookie('jwt', refreshToken, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        accessToken,
        refreshToken,
        message: msg,
        data: {
            profilePhoto: user.profilePhoto,
            username: user.userName,
            name: user.name,
            draft: user.isAnyDraft
        }
    });
}


exports.renewAccessToken = catchAsync(async (req, res, next) => {
    // console.log("Hi");
    // const refreshToken = req.body.token;
    // console.log(refreshToken);

    const cookies = req.cookies
    // console.log(req);
    // console.log(cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt

    let decoded;
    if (refreshToken) {
        const valid = await UserToken.findOne({ token: refreshToken });
        if (valid) {
            // console.log("humm hm");
            decoded = await promisify(jwt.verify)(refreshToken, process.env.JWT_RFRESH_SECRET);
        } else {
            res.status(404).json({
                message: 'Your are not authenticated 🙃🙃🙃🙃'
            });
        }
    } else {
        res.status(404).json({
            message: 'Please Send refresh token 🙃🙃🙃🙃'
        });
    }

    const accessToken = signToken(decoded.id, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);

    const x = await User.findById(decoded.id);
    // console.log(decoded.id);
    return res.status(201).json({
        accessToken: accessToken,
        profilePhoto: x.profilePhoto
    });
});


exports.logOut = catchAsync(async (req, res, next) => {
    // const refreshToken = req.body.token;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;


    const userToken = await UserToken.findOne({ token: refreshToken });

    if (!userToken) {
        // console.log("uooooo");
        return res
            .status(200)
            .json({ error: false, message: "Logged Out Sucessfully" });
    }

    await userToken.remove();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });

})


exports.checkPassAndUserID = catchAsync(async (req, res, next) => {
    let { userName, email } = req.body;
    let resObj = { usernameAva: false, emailAva: false };

    userName = await User.findOne({ userName });

    if (!userName) {
        // console.log("hi user");
        resObj.usernameAva = true;
    }

    email = await User.findOne({ email });

    if (!email) {
        // console.log("hi email");
        resObj.emailAva = true;
    }


    res.status(200).json({
        resObj
    });

});


exports.signup = catchAsync(async (req, res, next) => {

    let { userName, email } = req.body;
    let resObj = { usernameAva: false, emailAva: false };

    userName = await User.findOne({ userName });

    if (!userName) {
        // console.log("hi user");
        resObj.usernameAva = true;
    }

    email = await User.findOne({ email });

    if (!email) {
        // console.log("hi email");
        resObj.emailAva = true;
    }

    if (resObj.usernameAva && resObj.emailAva) {

        const { name, email, password, userName } = req.body;
        const newUser = await User.create({ name: name, email: email, password: password, userName: userName });
        // const newUser = await User.create(req.body);
        const OTP = genarateOTP();
        const emailVarification = await EmailVerificationToken.create({ owner: newUser._id, token: OTP });
        
        const options = {
            OTP: OTP,
            email: newUser.email,
            subject: "Email Verification",
            message: `<p>Your Verification OTP</p>
            <h1>${OTP}</h1>`,
        };

        const msg = "Please verify your email. OTP has been sent to your email !"
        await sendEmail(options);

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 1);
        // currentDate.setSeconds(currentDate.getSeconds() + 55);

        schedule.scheduleJob(currentDate,async () => {
            const stillExistToken = await EmailVerificationToken.findOne({owner: newUser._id});
            if(stillExistToken){
                await EmailVerificationToken.findByIdAndDelete(emailVarification._id);
                await User.findByIdAndDelete(newUser._id);
            }
        });

        res.status(200).send({msg:msg});
        // createSendToken(newUser,msg, 201, res);
          
    }
    else {
        res.status(200).json({
            resObj
        });
    }

})



exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;
  
    if (!isValidObjectId(userId))
      return res.status(404).send({ error: "Invalid user!" });
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "user not found!" });
  
    if (user.isVerified)
      return res.status(200).send({ error: "user is already verified!" });
  
    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) {

        // ! Testing Phase
        // await User.findByIdAndDelete(userId);
        return res.status(404).send({ error: "token not found!" });
    }
  
    const isMatched = await token.compareToken(OTP);
    if (!isMatched)
      return res.status(400).send({ error: "Please submit a valid OTP!" });
  
    user.isVerified = true;
    await user.save();
    await EmailVerificationToken.findByIdAndDelete(token._id);
    
    const options = {
        OTP: OTP,
        email: user.email,
        subject: "Welcome !! 🙂🙂🙂🙂",
        message: "<h1>Thanks For Visiting.😊😊😊 <h1> ",
    };
    
    const msg = "Welcome to DevLog !!Your email is verified!! 🙂🙂"

    newUser = {
        _id:userId,
    }

    createSendToken(newUser,msg, 201, res);
    //Send Welcome email
    await sendEmail(options);
  
    // res.status(200).send({ message: "Your email is verified !! 🙂🙂🙂" });
};



exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email or password 🙃🙃🙃 !!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if(!user.isVerified){
        return res.status(200).send({
            message: 'Please Register in DEVLog and verify your E-Mail.'
        })
    }

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect Email or Password 😔😔😔😔 !!', 401));
    }

    const msg = "Login successfull !! 🙂🙂"
    createSendToken(user, msg,200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in 🙃🙃🙃!!', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('This user belonging to this token does not no longer exist. ', 401));
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently change password! Please Long In !!', 401));
    }
    req.user = currentUser;
    next();
});


exports.forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with this email adderess !!', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (Valid for 10 min).',
            message
        })
        res.status(200).json({
            status: 'success',
            message: 'Token send to email !!'
        })
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There war an error to sending mail. Please try again !!', 500));
    }
});


exports.resetPassword = catchAsync(async (req, res, next) => {
    // console.log("Hi....");
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        return next(new AppError('Token is invalid or has expired.!!', 400));
    }
    user.password = req.body.password;
    // user.confirmPassword = req.body.confirmPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        next(new AppError('You are not authenticated !!', 404));
    }

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Incorrect Password 😔😔😔😔 !!', 401));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    createSendToken(user, 200, res);

});