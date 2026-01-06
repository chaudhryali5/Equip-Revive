import Users from "../models/userSchema.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import axios from "axios";
import { sendEmail } from "../config/modeMailerConfig.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('REGISTER ROUTE HIT!', { body: req.body });
    if (!name || !email || !password) {
        return res.send({ status: false, message: "User details are missing" })
    }

    const isValidePattern = validator.isEmail(email)
    if (!isValidePattern) {
        return res.send({ status: false, code: 302, message: "Email pattern will be example@email.com" })
    }
    try {
        console.log(' Looking for existing user with email:', email);
        const user = await Users.findOne({
            email: email
        });
        console.log("found user:", user);

        if (user) {
            if (user.email === email) {
                console.log(' Email already taken:', email);
                return res.send({ status: false, message: "Email already exists" });
            }

        }

        const salt = await bcrypt.genSalt(10);
        const myHashPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            email,
            password: myHashPassword
        });

        console.log('4. Saving user to DB...');
        const result = await newUser.save();
        console.log('created user:', result);

        const token = jwt.sign({
            userId: result._id,
            useremail: result.email,


        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        if (token) {
            return res.send({
                status: true,
                message: "User Registered successful",
                token,
                user: {
                    name: result.name,
                    email: result.email,
                    isAccountVerified: result.isAccountVerified
                }
            })
        } else {
            return res.send({ status: false, message: "Register failed" })
        }

    } catch (error) {
        console.error('REGISTER ERROR:', error);
        return res.status(500).send({ status: false, message: "Something went wrong" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.send({ status: false, message: "Email and password required" })
    }
    const isValidePattern = validator.isEmail(email)
    if (!isValidePattern) {
        return res.send({ status: false, message: "Email pattern will be example@email.com" })
    }
    try {
        const user = await Users.findOne({
            email: email

        });

        if (!user) {
            return res.send({ status: false, message: "User not found" });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.send({ status: false, message: "Password is incorrect" });
        }
        const content = `
        <h1>You have successfully loggedin to our system</h1>
        `;

        const token = jwt.sign({
            userId: user._id,
            useremail: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        if (token) {
            await sendEmail(process.env.SENDER_EMAIL, "Login Successful! ✨🎉", content)
            return res.send({
                status: true,
                message: "User loggedin successful",
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    isAccountVerified: user.isAccountVerified
                }
            })
        } else {
            return res.send({ status: false, message: "Logging failed" })
        }

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.send({ status: false, message: "something went wrong" });
    }
};

export const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ status: false, message: "Please enter email and password" })
    }
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const adminPayload = {
                email: email,
                role: "admin"
            };
            const token = jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: "24hr" });
            res.send({
                status: true,
                token,
                email,
                role: "admin",
                expiresIn: "24hr"
            });

        } else {
            res.send({ status: false, message: "Invalid credentials" })
        }
    } catch (error) {
        return res.send({ status: false, message: "Something went wrong!" })
    }
}

