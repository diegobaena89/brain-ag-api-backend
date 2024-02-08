import { Request, Response } from "express";
import deleteFarm from "../services/deleteFarm";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("deleteFarm", () => {
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
      end: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 500 if there is an error in the database query", async () => {
    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback("Database error");
    });

    await deleteFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalled();
    expect(pool.query).toHaveBeenCalled();
  });

  it("should return 200 if the farm is deleted successfully", async () => {
    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback(null);
    });

    await deleteFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(pool.query).toHaveBeenCalled();
  });
});
