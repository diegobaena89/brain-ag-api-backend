import { Router } from "express";
import addFarm from "../services/addFarm";

export const router = Router();

// add farm
router.post("/farms", addFarm);
