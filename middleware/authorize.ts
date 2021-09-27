import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "../utils/types";
import { AuthorizationError } from "./utils/handleError";

export function authorizeMiddleware(minimumLevelAccess: string) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const roles: string[] = session?.user["http://localhost:3000/roles"];

    if (roles.includes("admin")) {
      return session?.user;
    }

    if (roles.includes("pm")) {
      if (
        minimumLevelAccess == UserRole.pm ||
        minimumLevelAccess == UserRole.dev
      ) {
        return session?.user;
      }
    }

    if (roles.includes("dev")) {
      if (minimumLevelAccess == UserRole.dev) {
        return session?.user;
      }
    }

    throw new AuthorizationError("unauthorized");
  };
}
