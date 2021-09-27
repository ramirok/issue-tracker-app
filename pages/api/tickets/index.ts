import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { authorizeMiddleware } from "../../../middleware/authorize";
import dbConnect from "../../../lib/mongodb";
import responseError from "../../../middleware/utils/handleError";
import { validate, validateMiddleware } from "../../../middleware/validate";
import { UserRole } from "../../../utils/types";
import ProjectModel from "../../../models/project.model";
import TicketModel, { Ticket } from "../../../models/ticket.model";
import "../../../models/userData.model";

const validateCreateTicket = validateMiddleware(
  validate("createTicket"),
  validationResult
);

const validateEditTicket = validateMiddleware(
  validate("editTicket"),
  validationResult
);

const validateDeleteTicket = validateMiddleware(
  validate("deleteTicket"),
  validationResult
);

const createTicketAccessControl = authorizeMiddleware(UserRole.pm);
const getTicketsAccessControl = authorizeMiddleware(UserRole.dev);
const editTicketAccessControl = authorizeMiddleware(UserRole.pm);
const deleteTicketAccessControl = authorizeMiddleware(UserRole.pm);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method == "DELETE") {
    try {
      const user = await deleteTicketAccessControl(req, res);
      await validateDeleteTicket(req, res);

      const { _id } = req.body;
      const userEmail = user?.email;
      const userRoles = user?.["http://localhost:3000/roles"];

      const isAdmin = userRoles.includes("admin");
      const existingTicket = await TicketModel.findOneAndDelete(
        isAdmin ? { _id } : { _id, creator: userEmail }
      );
      if (existingTicket) {
        return res.json({
          message: "ticket deleted successfully",
          data: existingTicket,
        });
      } else {
        return res.status(400).json({ message: "task failed" });
      }
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "PUT") {
    try {
      const user = await editTicketAccessControl(req, res);
      await validateEditTicket(req, res);

      const userRoles = user?.["http://localhost:3000/roles"];
      const isAdmin = userRoles.includes("admin");

      const {
        _id,
        priority,
        name,
        details,
        assigned,
        completed,
        project,
        type,
        steps,
      } = req.body;

      const existingTicket = await TicketModel.findOne(
        isAdmin ? { _id } : { _id, creator: user?.email }
      );

      const existingProject = project
        ? await ProjectModel.findOne({ _id: project })
        : true;

      if (existingTicket && existingProject) {
        existingTicket.type = type || existingTicket.type;
        existingTicket.priority = priority || existingTicket.priority;
        existingTicket.projectId = project || existingTicket.projectId;
        existingTicket.name = name || existingTicket.name;
        existingTicket.details = details || existingTicket.details;
        existingTicket.steps = steps || existingTicket.steps;
        existingTicket.assigned = assigned || existingTicket.assigned;
        existingTicket.completed =
          completed !== undefined ? completed : existingTicket.completed;

        await existingTicket.save();
        await existingTicket.populate(["members", "project"]);

        return res.json({
          message: "ticket updated successfully.",
          data: existingTicket,
        });
      } else {
        return res.status(400).json({ message: "task failed" });
      }
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "POST") {
    try {
      const user = await createTicketAccessControl(req, res);
      await validateCreateTicket(req, res);

      const userEmail = user?.email;

      const data: Ticket = {
        type: req.body.type,
        priority: req.body.priority,
        projectId: req.body.project,
        name: req.body.name,
        details: req.body.details,
        steps: req.body.steps,
        creator: userEmail,
        assigned: req.body.assigned,
        completed: false,
      };
      const foundProject = await ProjectModel.findOne({ _id: data.projectId });
      if (foundProject) {
        const newTicket = new TicketModel(data);
        await newTicket.save();
        await newTicket.populate(["members", "project"]);

        return res.status(201).json({
          message: "Project created successfully.",
          data: newTicket,
        });
      } else {
        return res.status(400).json({ message: "task failed" });
      }
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "GET") {
    try {
      const user = await getTicketsAccessControl(req, res);
      const roles = user?.["http://localhost:3000/roles"];
      const isAdmin = roles?.includes("admin");

      const projects = await ProjectModel.find({
        membersId: user?.sub,
      });

      const queryOptions: { [k: string]: any } = {};

      if (!isAdmin) {
        queryOptions.projectId = {
          $in: projects.map((project) => project._id),
        };
      }
      let tickets;

      tickets = await TicketModel.find(queryOptions)
        .limit(3)
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
};

export default withApiAuthRequired(handler);
