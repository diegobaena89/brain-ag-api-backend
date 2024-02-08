import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function getFarmById(req: Request, res: Response) {
  try {
    const { rows } = await pool.query("SELECT * FROM farms WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(400).send("Database error").end();
  }
}
