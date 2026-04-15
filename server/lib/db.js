import mongoose from "mongoose";

// function to connect with databae
export const connectDB = async () => {
    try {
        // execute when database will be established
        mongoose.connection.on("connected", () => console.log("Database Connected"));
        // execute when there would be error during runtime
        mongoose.connection.on("error", (err) => console.log("DB Error:", err));

        // to established connection we have used this
        await mongoose.connect(`${process.env.MONGODB_URI}/chatterup`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1); // important in production
    }
}
