import express from "express";
import { accounts, Account } from "../accounts";

const app = express();
app.use(express.json());

// Task 1: Fetch All Accounts (GET)
// Create a route at /accounts that:
// Responds to GET requests
// Returns all accounts in JSON format
// Sends a 200 OK status
app.get("/accounts", (req, res) => {
  console.log(req.params);
  res.status(200).json(accounts);
});

// Task 2: Create a New Account (POST)
// Create a route at /accounts that:
// Responds to POST requests
// Accepts new account data in req.body
// Generates a unique id
// Initializes funds to 0
// Adds the new account to the accounts array
// Returns the newly created account with a 201 Created status

// Hint: Use Date.now() to generate a unique ID.

app.post("/accounts", (req, res) => {
  const lastAccount = accounts[accounts.length - 1];
  const id = lastAccount ? lastAccount.id + 1 : 1;

  //   const id = accounts.length ? accounts[accounts.length - 1].id + 1 : 1; need to break so that it wont crush
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }
  const newAccount = {
    id: Date.now(),
    // sequence: id, i added sequence cuz : Date.now(), gives me multiple numbers not following same sequence.
    username,
    funds: 0,
  };

  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// http://localhost:8000/accounts/Omar?currency=usd

app.listen(8000, () => {
  console.log("my express server is working");
});
