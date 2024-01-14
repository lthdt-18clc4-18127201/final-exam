import express from "express";
import Place from "../models/places.model.js";
import Billboard from "../models/billboard.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      ward,
      district,
      locationType,
      advertisingForm,
      image,
      isPlanned,
      lat,
      lng,
      address,
    } = req.body;
    const newPlace = new Place({
      ward,
      district,
      locationType,
      advertisingForm,
      image,
      isPlanned,
      lat,
      lng,
      address,
    });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add-billboard", async (req, res) => {
  try {
    const { title, idPlace, imageUrl, width, height, expiredDate, quantity } =
      req.body;
    const newBillboard = new Billboard({
      title,
      idPlace,
      imageUrl,
      width,
      height,
      expiredDate,
      quantity,
    });

    await newBillboard.save();
    const place = await Place.findById(idPlace);
    if (!place) {
      res.status(404).json({ message: "Place not found" });
    }
    place.hasBillboard = true;
    await place.save();
    res.status(201).json(newBillboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add the new route
router.get("/boardbills", async (req, res) => {
  const { placeId } = req.query;

  try {
    const boardbills = await Billboard.find({ idPlace: placeId });
    res.json(boardbills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
