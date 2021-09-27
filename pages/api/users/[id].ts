import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { RolesId } from ".";
import { authorizeMiddleware } from "../../../middleware/authorize";

import dbConnect from "../../../lib/mongodb";
import getManagmentToken from "../../../middleware/utils/auth0";
import responseError from "../../../middleware/utils/handleError";
import { validate, validateMiddleware } from "../../../middleware/validate";
import UserModel from "../../../models/userData.model";
import { UserRole } from "../../../utils/types";

type Roles = keyof typeof RolesId;

const validateAddRole = validateMiddleware(
  validate("addRole"),
  validationResult
);

const validateRemoveRole = validateMiddleware(
  validate("removeRole"),
  validationResult
);

const manageRolesAccessControl = authorizeMiddleware(UserRole.admin);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method == "POST") {
    try {
      await manageRolesAccessControl(req, res);
      await validateAddRole(req, res);

      const userId = req.query.id;
      const newRole: Roles = req.body.role;
      const userFound = await UserModel.findOne({ user_id: userId });
      const roleAlreadyAdded = userFound.roles.includes(newRole);
      if (roleAlreadyAdded) {
        return res.json({ message: "role added successfully" });
      }
      if (userFound) {
        const token = await getManagmentToken();

        const response = await fetch(
          `https://dev-98dsvvx8.us.auth0.com/api/v2/users/${userId}/roles`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roles: [RolesId[newRole]],
            }),
          }
        );

        if (response.status === 204) {
          userFound.roles.push(newRole);
          await userFound.save();
          return res.json({ message: "role added successfully" });
        }
      }
      return res.status(400).json({ message: "failed task" });
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "DELETE") {
    try {
      await manageRolesAccessControl(req, res);
      await validateRemoveRole(req, res);

      const userId = req.query.id;
      const newRole: Roles = req.body.role;
      const userFound = await UserModel.findOne({ user_id: userId });
      const roleAlreadyAdded = userFound.roles.includes(newRole);
      if (!roleAlreadyAdded) {
        return res.json({ message: "role removed successfully" });
      }

      if (userFound) {
        const token = await getManagmentToken();
        const response = await fetch(
          `https://dev-98dsvvx8.us.auth0.com/api/v2/users/${userId}/roles`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roles: [RolesId[newRole]],
            }),
          }
        );
        if (response.status === 204) {
          userFound.roles = userFound.roles.filter(
            (role: string) => role !== newRole
          );
          await userFound.save();
          return res.json({ message: "role removed successfully" });
        }
      }
      return res.json({ message: "task failed" });
    } catch (error) {
      responseError(error, res);
    }
  }
}

export default withApiAuthRequired(handler);
