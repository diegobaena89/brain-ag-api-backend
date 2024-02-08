import { Request, Response } from "express";
import listFarmsBySolo from "../services/listFarmsBySolo";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("listFarmsBySolo", () => {
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

  it("should return total solo areas when the query is successful", async () => {
    const mockResults = {
      rows: [{ area_vegetation: 50, area_agriculture: 30 }],
    };

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(null, mockResults);
    });

    await listFarmsBySolo(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "Vegetação", value: 50 },
      { id: "Agricultura", value: 30 },
    ]);
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return an error response when the query fails", async () => {
    const mockError = "Database error";

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(mockError, null);
    });

    await listFarmsBySolo(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Database error");
    expect(res.json).not.toHaveBeenCalled();
  });
});
