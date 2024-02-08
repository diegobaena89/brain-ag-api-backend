import { Request, Response } from "express";
import listFarmsByCulture from "../services/listFarmsByCulture";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("listFarmsByCulture", () => {
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

  it("should return total farms by culture when the query is successful", async () => {
    const mockResults = {
      rows: [{ soja: 10, milho: 5, algodão: 3, café: 7, cana: 2 }],
    };

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(null, mockResults);
    });

    await listFarmsByCulture(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "Soja", value: 10 },
      { id: "Milho", value: 5 },
      { id: "Algodão", value: 3 },
      { id: "Café", value: 7 },
      { id: "Cana", value: 2 },
    ]);
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return an error response when the query fails", async () => {
    const mockError = "Database error";

    (pool.query as jest.Mock).mockImplementationOnce((_, callback) => {
      callback(mockError, null);
    });

    await listFarmsByCulture(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Database error");
    expect(res.json).not.toHaveBeenCalled();
  });
});
