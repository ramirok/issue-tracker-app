import { ObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import "../../../models/userData.model";
import "../../../models/project.model";
import TicketModel from "../../../models/ticket.model";
import CommentModel from "../../../models/comment.model";
import { validate, validateMiddleware } from "../../../middleware/validate";
import { validationResult } from "express-validator";
import ProjectModel from "../../../models/project.model";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import dbConnect from "../../../lib/mongodb";
import responseError from "../../../middleware/utils/handleError";
import { authorizeMiddleware } from "../../../middleware/authorize";
import { UserRole } from "../../../utils/types";

const validateGetSingleTicket = validateMiddleware(
  validate("getSingleTicket"),
  validationResult
);

const getSingleTicketAccessControl = authorizeMiddleware(UserRole.dev);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await getSingleTicketAccessControl(req, res);

    await validateGetSingleTicket(req, res);

    await dbConnect();
    const { ticketId } = req.query;
    const session = getSession(req, res);
    const roles = session?.user["http://localhost:3000/roles"];
    const isAdmin = roles?.includes("admin");

    const projects = await ProjectModel.find({
      membersId: session?.user.sub,
    });

    const queryOptions: { [k: string]: any } = {};
    queryOptions._id = ticketId;
    if (!isAdmin) {
      queryOptions.projectId = {
        $in: projects.map((project) => project._id),
      };
    }

    const ticket = await TicketModel.findOne(queryOptions)
      .populate("members")
      .populate("project");
    const comments = await CommentModel.find({
      ticketId: ticketId as unknown as ObjectId,
    }).populate("creator");

    if (ticket && comments) {
      const data = { ticket, comments };
      return res.json({
        message: "Ticket retrieved successfully",
        data: data,
      });
    } else {
      return res.json({ message: "Ticket retrieved successfully", data: {} });
    }
  } catch (error) {
    responseError(error, res);
  }
}

export default withApiAuthRequired(handler);
