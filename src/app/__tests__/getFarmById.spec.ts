import { Request, Response } from "express";
import getFarmById from "../services/getFarmById";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("getFarmById", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return farm data when the query is successful", async () => {
    // Mocking a successful query result
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, name: "Farm 1" }],
    });

    await getFarmById(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM farms WHERE id = $1",
      ["1"]
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Farm 1" }]);
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return an error response when the query fails", async () => {
    // Mocking a failed query result
    (pool.query as jest.Mock).mockRejectedValueOnce("Database error");

    await getFarmById(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM farms WHERE id = $1",
      ["1"]
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Database error");
    expect(res.json).not.toHaveBeenCalled();
  });
});
