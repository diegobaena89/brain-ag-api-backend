import { Request, Response } from "express";
import addFarm from "../services/addFarm";
import { pool } from "../models/db";

jest.mock("../models/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("addFarm", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        document: "123456789",
        productor_name: "John Doe",
        farm_name: "Farm A",
        state: "CA",
        city: "City A",
        total_area: 100,
        agriculture_area: 60,
        area_vegetation: 40,
        cultures: "Wheat, Corn",
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

  it("should return 400 if total_area does not match sum of agriculture + vegetation area", async () => {
    req.body.total_area = 90; // Incorrect total_area

    await addFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      "Total area does not match sum of agriculture + vegetation area"
    );
    expect(pool.query).not.toHaveBeenCalled();
  });

  it("should return 500 if there is an error in the database query", async () => {
    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback("Database error");
    });

    await addFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(undefined);
    expect(pool.query).toHaveBeenCalled();
  });

  it("should return 201 if the farm is added successfully", async () => {
    (pool.query as jest.Mock).mockImplementationOnce((query, callback) => {
      callback(null);
    });

    await addFarm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(undefined);
    expect(pool.query).toHaveBeenCalled();
  });
});
