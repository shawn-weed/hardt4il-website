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
        default: "https://i.ibb.co/zH54WFS/default-Profile-Photo.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema)

export default User;