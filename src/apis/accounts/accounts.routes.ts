import express, { Router } from "express";
import {
  createAccount,
  deleteAccount,
  // getAccountByUsername,
  getAllAccounts,
  updateAccount,
} from "./accounts.controllers";

const router = Router();

router.get("/", getAllAccounts);
router.post("/", createAccount);
router.delete("/:accountId", deleteAccount);
router.put("/:accountId", updateAccount);
// router.get("/:username", getAccountByUsername);

export default router;
