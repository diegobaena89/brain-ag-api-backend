import { Router } from "express";
import addFarm from "../services/addFarm";
import getAllFarms from "../services/getAllFarms";
import getFarmById from "../services/getFarmById";
import getTotalFarms from "../services/totalFarms";
import editFarm from "../services/editFarm";
import deleteFarm from "../services/deleteFarm";
import listFarmsByState from "../services/listFarmsByState";
import listFarmsByCulture from "../services/listFarmsByCulture";
import listFarmsBySolo from "../services/listFarmsBySolo";

export const router = Router();

// list farms
router.get("/farms", getAllFarms);
router.get("/farms/:id", getFarmById);
router.get("/farms-total", getTotalFarms);

// add farm
router.post("/farms", addFarm);

// edit farm
router.put("/farms/:id", editFarm);

// delete farm
router.delete("/farms/:id", deleteFarm);

// dashboard route for the frontend
router.get("/dashboard-state", listFarmsByState);
router.get("/dashboard-culture", listFarmsByCulture);
router.get("/dashboard-solo", listFarmsBySolo);
