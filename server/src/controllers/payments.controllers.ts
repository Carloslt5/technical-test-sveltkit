import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

const payments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { limit, skip } = req.query

    const queryLimit = typeof limit === 'string' ? parseInt(limit) : 6;
    const querySkip = typeof skip === 'string' ? parseInt(skip) : 0;

    const query = `
    SELECT * 
    FROM PAYMENTS 
    INNER JOIN CLIENTS ON client_id = CLIENTS.id 
    LIMIT $1 
    OFFSET $2`

    const result = await pool.query(query, [queryLimit, querySkip]);
    console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (error) {
    next(error)
  }
}

export {
  payments
}
