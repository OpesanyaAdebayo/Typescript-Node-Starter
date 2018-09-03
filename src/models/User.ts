import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export type userModel = mongoose.Document & {
    email: string,
    password: string,
    comparePassword: comparePasswordFunction
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
});

userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        })

    })
});

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const comparePassword: comparePasswordFunction = function (this:any, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model("User", userSchema);


export default User