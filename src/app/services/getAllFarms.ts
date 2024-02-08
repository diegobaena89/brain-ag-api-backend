import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function getAllFarms(_: Request, res: Response) {
  pool.query("SELECT * FROM farms", (error, results) => {
    error
      ? res.status(400).send(error).end()
      : res.status(200).json(results.rows);
  });
}
