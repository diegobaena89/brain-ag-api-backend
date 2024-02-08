import { Request, Response } from "express";

import { pool } from "../models/db";
import getTotalFarms from "../services/totalFarms";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("getTotalFarms", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return total area and farms count when the query is successful", async () => {
    const mockResults = {
      rows: [{ total_area_hc: 1000, farms_count: 5 }],
    };

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(null, mockResults);
    });

    await getTotalFarms(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults.rows);
    expect(res.end).not.toHaveBeenCalled();
  });

  it("should return an error response when the query fails", async () => {
    const mockError = "Database error";

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(mockError, null);
    });

    await getTotalFarms(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.end).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
