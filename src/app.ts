import express from "express";
import { accounts, Account } from "../accounts";
import accountsRouter from "./apis/accounts/accounts.routes";

const app = express();
app.use(express.json());

app.use("/accounts", accountsRouter);

app.listen(8000, () => {
  console.log("my express server is working");
});
