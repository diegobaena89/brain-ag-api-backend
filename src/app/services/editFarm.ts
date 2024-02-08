import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function editFarm(req: Request, res: Response) {
  const queryText =
    "UPDATE farms SET (document, productor_name, farm_name, state, city, total_area, area_agriculture, area_vegetation, cultures) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) where id = $10";

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

  if (areaLimit != total_area) {
    res
      .status(400)
      .send("The sum of the areas must be equal to the total area")
      .end();
    return 0;
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
      req.params.id,
    ],
  };

  pool.query(query, (error) => {
    error ? res.status(500).end() : res.status(201).end();
  });
}
