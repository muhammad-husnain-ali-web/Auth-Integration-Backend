// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/productsDB`)
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1)
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    await mongoose.connect(uri);

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
