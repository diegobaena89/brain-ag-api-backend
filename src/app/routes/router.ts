import { Router } from "express";
import addFarm from "../services/addFarm";
import getAllFarms from "../services/getAllFarms";
import getFarmById from "../services/getFarmById";
import getTotalFarms from "../services/totalFarms";

export const router = Router();

// list farms
router.get("/farms", getAllFarms);
router.get("/farms/:id", getFarmById);
router.get("/farms-total", getTotalFarms);

// add farm
router.post("/farms", addFarm);
