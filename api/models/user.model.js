import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: 'https://www.facebook.com/photo/?fbid=122116674878374962&set=a.122116674896374962&__cft__[0]=AZVgZefBfA4dG2xo0aRBk6uRYWoAhsNH9Zpplj8-REApx1bBICiUkYpWJPHRRDTtWKunHJYThaHAN1x9j3CPFrMih3D5EGX2Hql-3z1r_teevEWcFkJAEsdYiIRTfwUH5nYyFg-0VbVEt8oM3INfJkAEQ-IlvGPcAer39gwxzamBoA&__tn__=EH-R',
    },
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema)

export default User;