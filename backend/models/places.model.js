import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  address: String,
  ward: String,
  district: String,
  locationType: String,
  advertisingForm: String,
  image: String,
  isPlanned: Boolean,
  lat: Number,
  lng: Number,
  hasBillboard: { type: Boolean, default: false },
});
const Place = mongoose.model("Place", placeSchema);
export default Place;
