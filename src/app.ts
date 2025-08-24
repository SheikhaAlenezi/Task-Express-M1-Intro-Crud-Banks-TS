import express from "express";
import { accounts } from "../accounts";

const app = express();
app.listen(8000, () => {
  console.log("my express server is working");
});
// Task 1: Fetch All Accounts (GET)
// Create a route at /accounts that:
// Responds to GET requests
// Returns all accounts in JSON format
// Sends a 200 OK status
app.get("/api/accounts", (req, res) => {
  console.log(req.params);
  res.sendStatus(200).json(accounts);
});

// http://localhost:8000/accounts/Omar?currency=usd
