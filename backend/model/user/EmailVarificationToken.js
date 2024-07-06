const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const emailVerificationTokenSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

// emailVerificationTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 40 });

emailVerificationTokenSchema.pre('save',async function (next){
    if(this.isModified("token")) {
        this.token  = await bcrypt.hash(this.token,10);
    }
    next();
})


emailVerificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

module.exports = mongoose.model('EmailVerificationToken',emailVerificationTokenSchema);

