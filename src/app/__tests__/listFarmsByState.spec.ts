import { Request, Response } from "express";
import listFarmsByState from "../services/listFarmsByState";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("listFarmsByState", () => {
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

  it("should return farm counts by state when the query is successful", async () => {
    const mockResults = {
      rows: [
        { id: "State1", value: 10 },
        { id: "State2", value: 15 },
      ],
    };

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(null, mockResults);
    });

    await listFarmsByState(req, res);

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

    await listFarmsByState(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.end).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
