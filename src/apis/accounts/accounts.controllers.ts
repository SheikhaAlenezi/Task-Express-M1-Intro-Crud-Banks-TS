import { Request, Response } from "express";

import Account from "../../models/Account";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find().select("-createdAt -updatedAt");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch accounts" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }

    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("error creating account:", error);
    res.status(500).json({ error: "failed to create account" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "account not found" });
    }
    await account.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.error("error deleting account", error);
    res.status(500).json({ error: "failed to delete account" });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;
    const newData = req.body;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "account not found" });
    }
    await account.updateOne(newData);
    res.status(204).send();
  } catch (error) {
    console.error("error updating:", error);
    res.status(500).json({ error: "failed to update account" });
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const currency = req.query.currency;
    const account = await Account.findOne({ username });

    if (!account) {
      return res.status(404).json({ error: "account not found" });
    }
    let responseAccount = account.toObject();

    if (currency === "usd") {
      responseAccount.funds = +(account.funds * 3.25).toFixed(2);
      responseAccount.currency = "USD";
    }
    res.status(200).json(responseAccount);
  } catch (error) {
    console.error("error fetching account:", error);
    res.status(500).json({ error: "failed to fetch account" });
  }
};

export const getVipAccount = async (req: Request, res: Response) => {
  try {
    const amountParam = req.query.amount;
    const amount = Number(amountParam);
    if (!amount || amount < 0) {
      return res.status(400).json({ error: "invalid amount" });
    }
    const vipAccount = await Account.find({ funds: { $gt: amount } });
    res.status(200).json(vipAccount);
  } catch (error) {
    console.log("error VIP account", error);
    res.status(500).json({ error: "failed to fetch VIP" });
  }
};
