import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";



// Signup a new user
export const signup = async (req, res) => {
    const { email, fullname, password, bio } = req.body;

    try {
        if (!email || !fullname || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await User.create({
            fullname, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);

        return res.json({ success: true, user: newUser, token, message: "Account created successfully" })


    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }

}
