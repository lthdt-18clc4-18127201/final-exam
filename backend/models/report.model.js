import mongoose, { Schema } from "mongoose";

const reportSchema = new mongoose.Schema({
  idPlace: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  idBillboard: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Billboard",
  },
  userName: String,
  userPhone: String,
  email: String,
  content: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [String],
});
export default mongoose.model("Report", reportSchema);
