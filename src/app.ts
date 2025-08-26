import express from "express";
import accountsRouter from "./apis/accounts/accounts.routes";
import connectDB from "./database";

const app = express();
app.use(express.json());
connectDB();
app.use("/accounts", accountsRouter);

app.listen(8000, () => {
  console.log("my express server is working");
});
