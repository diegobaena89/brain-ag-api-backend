import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function listFarmsBySolo(req: Request, res: Response) {
  const queryText =
    "select sum(area_vegetation) as area_vegetation, sum(area_agriculture) as area_agriculture from farms";

  pool.query(queryText, (error, results) => {
    if (error) {
      res.status(400).send(error).end();
    } else {
      const totalSolo = [
        {
          id: "Vegetação",
          value: results.rows[0].area_vegetation,
        },
        {
          id: "Agricultura",
          value: results.rows[0].area_agriculture,
        },
      ];
      res.status(200).json(totalSolo);
    }
  });
}
