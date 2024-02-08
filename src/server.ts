import express from "express";
import { router } from "./app/routes/router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";

const port = 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// body parser
app.use(express.json());

// controller
app.use(router);

// server setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
