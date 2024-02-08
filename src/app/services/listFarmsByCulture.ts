import { Request, Response } from "express";
import { pool } from "../models/db";

export default async function listFarmsByCulture(req: Request, res: Response) {
  const queryText =
    "select (select count(*) as Soja from farms where 'Soja' = ANY (cultures)), (select count(*) as Milho from farms where 'Milho' = ANY (cultures)), (select count(*) as algodão from farms where 'Algodão' = ANY (cultures)), (select count(*) as café from farms where 'Café' = ANY (cultures)), (select count(*) as cana from farms where 'Cana' = ANY (cultures))";

  pool.query(queryText, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      const totalByCulture = [
        {
          id: "Soja",
          value: results.rows[0].soja,
        },

        {
          id: "Milho",
          value: results.rows[0].milho,
        },

        {
          id: "Algodão",
          value: results.rows[0].algodão,
        },

        {
          id: "Café",
          value: results.rows[0].café,
        },

        {
          id: "Cana",
          value: results.rows[0].cana,
        },
      ];

      res.status(200).json(totalByCulture);
    }
  });
}
