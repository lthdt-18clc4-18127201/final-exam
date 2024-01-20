import dotenv from "dotenv/config";
import express from "express";
import userRouter from "./routes/user.route.js";
import siteRouter from "./routes/site.route.js";
// import authRouter from "./routes/auth.route.js";
import placeRouter from "./routes/place.route.js";
import imageRouter from "./routes/image.route.js";
import reportRouter from "./routes/report.route.js";

import authMdw from "./middlewares/auth.mdw.js";
import cors from "cors";
import connection from "./utils/db.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "./middlewares/logger.mdw.js";

const app = express();
const PORT = process.env.PORT || 8080;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Places API",
      version: "1.0.0",
      description: "API for managing places and billboards",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

connection();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/images", imageRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(logger);
app.use("/api/places", placeRouter);
app.use("/api/report", reportRouter);
// app.use("/api/auth", authRouter);
// app.use("/", authMdw, siteRouter);
// app.use("/api/users", authMdw, userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
