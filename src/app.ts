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

// Task 3: Delete an Account (DELETE)
// Create a route at /accounts/:accountId that:
// Responds to DELETE requests
// Extracts the accountId using req.params
// Finds and removes the account with the matching ID
// If the account does not exist, return 404 Not Found
// If it exists, return 204 No Content with no body

app.delete("/accounts/:accountId", (req, res) => {
  const accountId = Number(req.params.accountId);
  const index = accounts.findIndex((acc) => acc.id === accountId);
  if (index === -1) {
    return res.status(404).json({ error: "account not found" });
  }
  accounts.splice(index, 1);
  res.status(204).send();
});

// Task 4: Update an Account (PUT)
// Create a route at /accounts/:accountId that:
// Responds to PUT requests-done
// Extracts the accountId from req.params
// Replaces the account's data with new values from req.body
// If not found, return 404 Not Found
// If successful, return the updated account and 200 OK

app.put("/accounts/:accountId", (req, res) => {
  const accountId = Number(req.params.accountId);
  const newData = req.body;

  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ error: "account not found" });
  }
  Object.assign(account, newData);
  console.log("Updating account:", accountId);
  console.log("New data:", newData);
  res.status(200).json({ message: "account updated!!", account });
});

// Bonus Challenge
// 🔎 Find Account by Username (GET)
// Create a route at /accounts/:username
// Responds with the account matching the owner's username
// If ?currency=usd is provided in the query, convert funds to USD (assume 1 KWD = 3.25 USD)
// Example URL:
// http://localhost:8000/accounts/Omar?currency=usd

app.get("/accounts/:username", (req, res) => {
  const username = req.params.username;
  const currency = req.query.currency;
  const account = accounts.find((acc) => acc.username === username);
  if (!account) {
    return res.status(404).json({ error: "account not found" });
  }
  let responseAccount = { ...account };
  if (currency === "usd") {
    responseAccount.funds = +(account.funds * 3.25).toFixed(2);
    responseAccount.currency = "USD";
  }
  res.status(200).json(responseAccount);
});

app.listen(8000, () => {
  console.log("my express server is working");
});
