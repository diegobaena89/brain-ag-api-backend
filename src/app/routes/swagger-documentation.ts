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

/**
 * @swagger
 * /farms:
 *   get:
 *     summary: Get all farms
 *     description: Retrieve a list of all farms.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               farms: []
 *       500:
 *         description: Internal Server Error
 */
router.get("/farms", getAllFarms);

/**
 * @swagger
 * /farms/{id}:
 *   get:
 *     summary: Get farm by ID
 *     description: Retrieve farm details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               farm: {}
 *       404:
 *         description: Farm not found
 */
router.get("/farms/:id", getFarmById);

/**
 * @swagger
 * /farms-total:
 *   get:
 *     summary: Get total farms
 *     description: Retrieve the total number of farms.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               total: 0
 */
router.get("/farms-total", getTotalFarms);

/**
 * @swagger
 * /farms:
 *   post:
 *     summary: Add a new farm
 *     description: Add a new farm to the system.
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             id: 1
 *             document: "19.570.254/0001-45"
 *             productor_name: "Diego Baena"
 *             farm_name: "Fazenda Glifada"
 *             state: "São Paulo"
 *             city: "São Paulo"
 *             total_area: 200
 *             area_agriculture: 110
 *             area_vegetation: 50
 *             cultures: ["Soja", "Cana"]
 *     responses:
 *       201:
 *         description: Farm created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/farms", addFarm);

/**
 * @swagger
 * /farms/{id}:
 *   put:
 *     summary: Edit farm by ID
 *     description: Edit farm details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to edit
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             // Updated farm data
 *     responses:
 *       200:
 *         description: Farm edited successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Farm not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/farms/:id", editFarm);

/**
 * @swagger
 * /farms/{id}:
 *   delete:
 *     summary: Delete farm by ID
 *     description: Delete farm by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Farm deleted successfully
 *       404:
 *         description: Farm not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/farms/:id", deleteFarm);

/**
 * @swagger
 * /dashboard-state:
 *   get:
 *     summary: Get farms by state for dashboard
 *     description: Retrieve farms grouped by state for dashboard.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               dashboardData: {}
 *       500:
 *         description: Internal Server Error
 */
router.get("/dashboard-state", listFarmsByState);

/**
 * @swagger
 * /dashboard-culture:
 *   get:
 *     summary: Get farms by culture for dashboard
 *     description: Retrieve farms grouped by culture for dashboard.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               dashboardData: {}
 *       500:
 *         description: Internal Server Error
 */
router.get("/dashboard-culture", listFarmsByCulture);

/**
 * @swagger
 * /dashboard-solo:
 *   get:
 *     summary: Get farms by soil type for dashboard
 *     description: Retrieve farms grouped by soil type for dashboard.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               dashboardData: {}
 *        500:
 *         description: Internal Server Error
 */
router.get("/dashboard-solo", listFarmsBySolo);
