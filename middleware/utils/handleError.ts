import { NextApiResponse } from "next";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message); // (1)
  }
}
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message); // (1)
  }
}

const responseError = (error: Error | unknown, res: NextApiResponse) => {
  if (error instanceof ValidationError) {
    return res.status(500).json({ message: "bad input" });
  }
  if (error instanceof AuthorizationError) {
    return res.status(401).json({ message: "unauthorized" });
  }
  return res.status(500).json({ message: "something went wrong" });
};

export default responseError;
