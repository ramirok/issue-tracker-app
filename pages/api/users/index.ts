import { NextApiRequest, NextApiResponse } from "next";
import getManagmentToken from "../../../middleware/utils/auth0";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import ProjectModel from "../../../models/project.model";
import UserModel from "../../../models/userData.model";
import dbConnect from "../../../lib/mongodb";
import { validate, validateMiddleware } from "../../../middleware/validate";
import { validationResult } from "express-validator";
import responseError from "../../../middleware/utils/handleError";
import { authorizeMiddleware } from "../../../middleware/authorize";
import { UserRole } from "../../../utils/types";

export enum RolesId {
  pm = "rol_l7yzrJv3dgz3gFZa",
  dev = "rol_jCdBB09tnPv8AHKj",
  admin = "rol_97IcblxI02VmkeJz",
}

const validateGetUsers = validateMiddleware(
  validate("getUsers"),
  validationResult
);

const getUsersAccessControl = authorizeMiddleware(UserRole.pm);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method == "GET") {
    try {
      await getUsersAccessControl(req, res);
      await validateGetUsers(req, res);

      const { role, projectId } = req.query;
      let users;
      if (role) {
        users =
          role === "all"
            ? await UserModel.find({})
            : await UserModel.find({
                roles: role as string,
              });
      } else if (projectId) {
        const query = await ProjectModel.findOne({ _id: projectId });
        if (query) {
          await query.populate("members");
          users = query.members;
        } else {
          users = [];
        }
      } else {
        users = await UserModel.find({});
      }
      return res.json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "POST") {
    const session = getSession(req, res);

    const userId = session?.user.sub;
    const userEmail = session?.user.email;
    const userPicture = session?.user.picture;
    const userName = session?.user.name;

    try {
      const userFound = await UserModel.findOne({ user_id: userId });

      if (userFound) {
        return res.json({
          message: "User data retrieved successfully",
          data: userFound,
        });
      } else {
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
              roles: [RolesId.dev],
            }),
          }
        );
        if (response.status === 204) {
          const userData = {
            roles: ["dev"],
            email: userEmail,
            name: userName,
            picture: userPicture,
            user_id: userId,
          };
          const newUser = new UserModel(userData);
          await newUser.save();
          return res.json({
            message: "User data retrieved successfully",
            data: newUser,
          });
        }
        return res.json({ message: "Failed" });
      }
    } catch (error) {
      responseError(error, res);
    }
  }
}

export default withApiAuthRequired(handler);
