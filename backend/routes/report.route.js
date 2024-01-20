import express from "express";
import Report from "../models/report.model.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - idPlace
 *         - reportType
 *         - userName
 *         - userPhone
 *         - email
 *         - content
 *         - status
 *       properties:
 *         idPlace:
 *           type: string
 *           description: The ID of the place related to the report.
 *         idBillboard:
 *           type: string
 *           description: The ID of the billboard related to the report.
 *         reportType:
 *           type: string
 *           description: The type of the report.
 *         userName:
 *           type: string
 *           description: The name of the user making the report.
 *         userPhone:
 *           type: string
 *           description: The phone number of the user making the report.
 *         email:
 *           type: string
 *           description: The email of the user making the report.
 *         content:
 *           type: string
 *           description: The content of the report.
 *         status:
 *           type: string
 *           description: The status of the report.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the report was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the report was last updated.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs related to the report.
 */

/**
 * @swagger
 * /api/report:
 *   post:
 *     summary: Creates a new report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       201:
 *         description: The report was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       500:
 *         description: There was an error creating the report.
 */

router.post("/", async (req, res) => {
  try {
    const {
      email,
      images,
      name,
      phone,
      reportContent,
      reportType,
      idPlace,
      idBillboard,
    } = req.body;
    const newReport = new Report({
      idPlace,
      idBillboard,
      reportType,
      userName: name,
      userPhone: phone,
      email,
      images,
      content: reportContent,
      status: "Chưa xử lý",
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
