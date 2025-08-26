import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await connect(
      "mongodb+srv://sheikha:Sheikhaalenezi98@cluster0.u4pltay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(connection.host);
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
