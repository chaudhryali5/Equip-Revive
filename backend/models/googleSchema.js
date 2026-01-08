import mongoose from "mongoose";

const googleScehma = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    isAccountVerified: {
        type: Boolean,
        default: true
    }
});

const googleUser = mongoose.model('googleUser', googleScehma);
export default googleUser;