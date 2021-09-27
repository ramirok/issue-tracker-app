import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const middleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Code from the Express middleware

    try {
      return handler(req, res);
    } catch (error) {
      // Code from the Express middleware
    }
  };
};

export default middleware;
