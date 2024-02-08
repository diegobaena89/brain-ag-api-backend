import { Request, Response } from "express";
import getAllFarms from "../services/getAllFarms";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("getAllFarms", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if there is an error in the database query", async () => {
    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback("Database error");
    });

    await getAllFarms(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
    expect(pool.query).toHaveBeenCalled();
  });

  it("should return 200 with farm data if the query is successful", async () => {
    const mockResults = {
      rows: [
        { id: 1, name: "Farm 1" },
        { id: 2, name: "Farm 2" },
      ],
    };

    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback(null, mockResults);
    });

    await getAllFarms(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults.rows);
    expect(pool.query).toHaveBeenCalled();
  });
});
