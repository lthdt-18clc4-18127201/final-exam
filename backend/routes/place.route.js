import express from "express";
import Place from "../models/places.model.js";
import Billboard from "../models/billboard.model.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - ward
 *         - district
 *         - locationType
 *         - advertisingForm
 *         - image
 *         - isPlanned
 *         - lat
 *         - lng
 *         - address
 *       properties:
 *         ward:
 *           type: string
 *         district:
 *           type: string
 *         locationType:
 *           type: string
 *         advertisingForm:
 *           type: string
 *         image:
 *           type: string
 *         isPlanned:
 *           type: boolean
 *         lat:
 *           type: string
 *         lng:
 *           type: string
 *         address:
 *           type: string
 *     Billboard:
 *       type: object
 *       required:
 *         - title
 *         - idPlace
 *         - imageUrl
 *         - width
 *         - height
 *         - expiredDate
 *         - quantity
 *       properties:
 *         title:
 *           type: string
 *         idPlace:
 *           type: string
 *         imageUrl:
 *           type: string
 *         width:
 *           type: number
 *         height:
 *           type: number
 *         expiredDate:
 *           type: date
 *           format: date
 *         quantity:
 *           type: number
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Returns a list of all places
 *     responses:
 *       200:
 *         description: A list of places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       500:
 *         description: Some thing wrong, can't get places
 */
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/places:
 *   post:
 *     summary: Creates a new place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: The created place
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       500:
 *         description: Some thing wrong, can't add place
 */
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

/**
 * @swagger
 * /places/add-billboard:
 *   post:
 *     summary: Adds a new billboard to a place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Billboard'
 *     responses:
 *       201:
 *         description: The created billboard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Billboard'
 *       404:
 *         description: Place not found
 *       500:
 *         description: Some thing wrong, can't add billboard
 *
 */
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

/**
 * @swagger
 * /api/places/boardbills:
 *   get:
 *     summary: Returns a list of all billboards for a specific place
 *     parameters:
 *       - in: query
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the place
 *     responses:
 *       200:
 *         description: A list of billboards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Billboard'
 *       500:
 *         description: Some thing wrong, can't find billboard
 */
router.get("/boardbills", async (req, res) => {
  const { placeId } = req.query;

  try {
    const boardbills = await Billboard.find({ idPlace: placeId });
    if (!boardbills) {
      return res.status(404).json({ message: "Billboard not found" });
    }
    return res.status(200).json(boardbills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
