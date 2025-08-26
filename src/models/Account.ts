import { Schema, model } from "mongoose";

const AccountSchema = new Schema(
  {
    // id: { type: Number },
    username: { type: String, required: true, unique: true },
    funds: { type: Number, default: 0 },
    // currency: { type: String, required: "USD" },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Account = model("Account", AccountSchema);
export default Account;
