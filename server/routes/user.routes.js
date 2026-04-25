// importing express 
import express from "express";

// import route protector
import protectRoute from "../middlewares/auth.js";

// importing user controller
import { checkAuth, login, signup, updateProfile } from "../controllers/user.controller";

// creating an instance of router
const userRouter = express.Router();

// user authentication endpoints
userRouter.post('/signup', protectRoute, signup);
userRouter.post('/login', protectRoute, login);

// endpoint for upating profile
userRouter.put('/update-profile', protectRoute, updateProfile);


// endpoint for checking authentication
userRouter.get('/check', protectRoute, checkAuth);


export default userRouter;  