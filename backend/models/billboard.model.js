import mongoose from "mongoose";

const billboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  idPlace: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  expiredDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Billboard = mongoose.model("Billboard", billboardSchema);

export default Billboard;
