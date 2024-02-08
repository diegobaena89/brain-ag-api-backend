import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function deleteFarm(req: Request, res: Response) {
  const queryText = "DELETE from farms where id = $1";

  const query = {
    text: queryText,
    values: [req.params.id],
  };

  pool.query(query, (error) => {
    error ? res.status(500).end() : res.status(200).json();
  });
}
