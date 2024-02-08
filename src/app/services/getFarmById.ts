import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function getFarmById(req: Request, res: Response) {
  pool.query(
    "SELECT * FROM farms WHERE id = $1",
    [req.params.id],
    (error, results) => {
      error
        ? res.status(400).send(error).end()
        : res.status(200).json(results.rows);
    }
  );
}
