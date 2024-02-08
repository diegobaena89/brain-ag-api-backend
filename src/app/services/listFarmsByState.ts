import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function listFarmsByState(_: Request, res: Response) {
  const queryText =
    "select state as id, count(state) as value from farms group by state";

  pool.query(queryText, (error, result) => {
    error ? res.status(400).end() : res.status(200).json(result.rows);
  });
}
