import { Request, Response } from "express";
import { accounts, Account } from "../../../accounts";

export const getAllAccounts = (req: Request, res: Response) => {
  res.status(200).json(accounts);
};

export const createAccount = (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }
  const newAccount = {
    id: Date.now(),
    username,
    funds: 0,
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
};

export const deleteAccount = (req: Request, res: Response) => {
  const accountId = Number(req.params.accountId);
  const index = accounts.findIndex((acc) => acc.id === accountId);
  if (index === -1) {
    return res.status(404).json({ error: "account not found" });
  }
  accounts.splice(index, 1);
  res.status(204).send();
};

export const updateAccount = (req: Request, res: Response) => {
  const accountId = Number(req.params.accountId);
  const newData = req.body;
  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ error: "account not found" });
  }
  Object.assign(account, newData);
  res.status(200).json({ message: "account updated!!", account });
};

export const getAccountByUsername = (req: Request, res: Response) => {
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
};
