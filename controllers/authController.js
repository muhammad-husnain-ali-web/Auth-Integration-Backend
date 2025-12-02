import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Users from '../models/User.js'
import { isStrongPassword, passwordsMatch } from "../libs/passwordCheker.js"

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}

const setCookies = async (user, res) => {
    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 5 * 60 * 1000,
        path: "/",
    });
}


export const register = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body

        if (!passwordsMatch(password, confirmPassword)) {
            return res.status(400).json({ success: false, message: "Passwords do not match" })
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: "Password is not strong enouge" })
        }

        const exist = await Users.findOne({ email })
        if (exist) {
            return res.status(400).json({ success: false, message: "User is already exit" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new Users({
            name,
            email,
            password: hashPassword
        })
        await newUser.save();

        return res.status(200).json({ success: true, message: "Email send Successfully", email })
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const isMath = await bcrypt.compare(password, user.password);
        if (!isMath) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

            setCookies(user, res)
            return res.status(200).json({ success: true, message: "User found successfully", user: { _id: user._id, name: user.name, role: user.role }})


    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}


export const me = async (req, res) => {
    try {
        const token = req.cookies.token
        const payload = verifyToken(token);

        if (payload === null) {
            return res.status(400).json({ success: false, auth: false, user: null })
        }
        const user = await Users.findById({_id: payload.id})


        return res.status(200).json({ success: true, auth: true, user: { _id: payload.id, name: user.name, role: payload.role } })

    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 5 * 60 * 1000,
            path: "/",
        });


        return res.status(200).json({ success: true, message: "Logout successfully" })

    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}