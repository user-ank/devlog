const { check,validationResult} = require("express-validator");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing."),
  check("email").isEmail().withMessage("Email is invalid."),
  check("userName").trim().not().isEmpty().withMessage("Username is missing."),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 4, max: 10 })
    .withMessage("Password must be 8 to 20 characters long"),
];


exports.validate = (req,res,next) => {
    const error = validationResult(req).array();

    if(error.length > 0) {
        return res.status(404).send({
            msg: error[0].msg
        });
    }

    next();
};