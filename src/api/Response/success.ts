import { Response } from "express";

export default (res: Response, { code, data }: { code?: number; data?: any }) =>
  res.status(code || 200).json({ status: "success", data });
