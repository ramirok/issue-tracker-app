import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import TicketModel from "../../../../models/ticket.model";
import ProjectModel from "../../../../models/project.model";
import { validate, validateMiddleware } from "../../../../middleware/validate";
import { validationResult } from "express-validator";
import responseError from "../../../../middleware/utils/handleError";
import { authorizeMiddleware } from "../../../../middleware/authorize";
import { UserRole } from "../../../../utils/types";

const validateGetTicketsByProject = validateMiddleware(
  validate("getTicketsByProject"),
  validationResult
);

const getTicketsByProjectAccessControl = authorizeMiddleware(UserRole.dev);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getTicketsByProjectAccessControl(req, res);
    await validateGetTicketsByProject(req, res);

    const roles = user?.["http://localhost:3000/roles"];
    const { projectId } = req.query;
    const isAdmin = roles?.includes("admin");

    const projects = await ProjectModel.find({
      membersId: user?.sub,
    });

    const queryOptions: { [k: string]: any } = {};

    if (projectId !== "all") {
      if (!isAdmin) {
        const foundIndex = projects.findIndex(
          (project) => project._id.toString() === projectId
        );
        if (foundIndex > -1) {
          queryOptions.projectId = projectId;
        } else {
          return res.json({
            message: "Tickets returned successfully",
            data: [],
          });
        }
      } else {
        queryOptions.projectId = projectId;
      }
    } else {
      if (!isAdmin) {
        queryOptions.projectId = {
          $in: projects.map((project) => project._id),
        };
      }
    }

    let tickets;

    tickets = await TicketModel.find(queryOptions)
      .sort({ createdAt: "desc" })
      .populate("members")
      .populate("project");

    return res.json({
      message: "Tickets returned successfully",
      data: tickets,
    });
  } catch (error) {
    responseError(error, res);
  }
}

export default withApiAuthRequired(handler);
