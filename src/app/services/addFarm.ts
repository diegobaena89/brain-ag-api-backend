import { pool } from "../models/db";
import { Request, Response } from "express";

export default async function addFarm(req: Request, res: Response) {
  const {
    document,
    productor_name,
    farm_name,
    state,
    city,
    total_area,
    agriculture_area,
    area_vegetation,
    cultures,
  } = req.body;

  const areaLimit = area_vegetation + agriculture_area;
  const queryText =
    "INSERT INTO farms(document, productor_name, farm_name, state, city, total_area, agriculture_area, area_vegetation, cultures) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  if (areaLimit !== total_area) {
    res
      .status(400)
      .send("Total area does not match sum of agriculture + vegetation area");
  }

  const query = {
    text: queryText,
    values: [
      document,
      productor_name,
      farm_name,
      state,
      city,
      total_area,
      agriculture_area,
      area_vegetation,
      cultures,
    ],
  };
  pool.query(query, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(201).json();
    }
  });
}
