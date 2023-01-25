const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  phone: { type: Number },
});
UserSchema.index({ username: 1 });

module.exports = UserSchema;
