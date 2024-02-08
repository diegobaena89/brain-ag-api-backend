import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function getTotalFarms(_: Request, res: Response) {
  const queryText =
    "select (select sum(total_area) as total_area_hc from farms), (select count(*) as farms_count from farms);";
  pool.query(queryText, (error, results) => {
    error
      ? res.status(400).send(error).end()
      : res.status(200).json(results.rows);
  });
}
