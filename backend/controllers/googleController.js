import googleUser from "../models/googleSchema.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import oauth2client from "../config/googleConfig.js";


export const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { name, email, picture } = userRes.data;
        let user = await googleUser.findOne({ email });

        if (!user) {
            user = await googleUser.create({
                name,
                email,
                image: picture
            })
        }
        const { id } = user;
        const token = jwt.sign({ userId: id, useremail: email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        if (token) {
            return res.send({ status: true, message: "User loggedin successful", token, user: { ...user._doc, isAccountVerified: user.isAccountVerified || true } })
        } else {
            return res.send({ status: false, message: "Logging failed" })
        }
    } catch (error) {
        console.log({ status: false, message: "something went wrong", error });
        return res.send({ status: false, message: "something went wrong" });
    }
}
