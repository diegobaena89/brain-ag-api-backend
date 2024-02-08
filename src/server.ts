import express from "express";
import { router } from "./app/routes/router";

const port = 3000;
const app = express();

// body parser
app.use(express.json());

// controller
app.use(router);

// server setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
