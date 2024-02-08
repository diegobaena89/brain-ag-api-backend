import { Request, Response } from "express";
import editFarm from "../services/editFarm";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("editFarm", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
      body: {
        document: "123456789",
        productor_name: "John Doe",
        farm_name: "Farm A",
        state: "CA",
        city: "City A",
        total_area: 1000,
        agriculture_area: 700,
        area_vegetation: 300,
        cultures: ["Soybean", "Corn"],
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully edit farm when the query is successful", async () => {
    const mockQuery = jest.fn().mockImplementationOnce((_, callback) => {
      callback(null);
    });

    (pool.query as jest.Mock).mockImplementationOnce(mockQuery);

    await editFarm(req, res);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.end).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return an error response when the query fails", async () => {
    const mockQuery = jest.fn().mockImplementationOnce((_, callback) => {
      callback("Database error");
    });

    (pool.query as jest.Mock).mockImplementationOnce(mockQuery);

    await editFarm(req, res);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.end).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return an error response when the sum of areas is not equal to the total area", async () => {
    req.body.total_area = 1200;

    await editFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      "The sum of the areas must be equal to the total area"
    );
    expect(res.end).toHaveBeenCalled();
  });
});
