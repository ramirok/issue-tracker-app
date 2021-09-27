import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { authorizeMiddleware } from "../../middleware/authorize";
import dbConnect from "../../lib/mongodb";
import responseError from "../../middleware/utils/handleError";
import { validate, validateMiddleware } from "../../middleware/validate";
import { UserRole } from "../../utils/types";
import ProjectModel, { Project } from "../../models/project.model";
import TicketModel from "../../models/ticket.model";
import "../../../models/userData.model";

const validateCreateProject = validateMiddleware(
  validate("createProject"),
  validationResult
);

const validateEditProject = validateMiddleware(
  validate("editProject"),
  validationResult
);

const validateDeleteProject = validateMiddleware(
  validate("deleteProject"),
  validationResult
);

const createProjectAccessControl = authorizeMiddleware(UserRole.admin);
const getProjectAccessControl = authorizeMiddleware(UserRole.dev);
const editProjectAccessControl = authorizeMiddleware(UserRole.admin);
const deleteProjectAccessControl = authorizeMiddleware(UserRole.admin);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method == "DELETE") {
    try {
      const user = await deleteProjectAccessControl(req, res);
      await validateDeleteProject(req, res);

      const { _id } = req.body;
      const existingProject = await ProjectModel.findOneAndDelete({
        _id,
      });
      if (existingProject) {
        await TicketModel.deleteMany({ projectId: _id });

        return res.json({
          message: "Project deleted successfully.",
          data: existingProject,
        });
      }
      return res.status(400).json({ message: "failed to perform task" });
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "PUT") {
    try {
      const user = await editProjectAccessControl(req, res);
      await validateEditProject(req, res);

      const userEmail = user?.email;
      const { _id, projectName, companyName, completed, members, tags } =
        req.body;
      const existingProject = await ProjectModel.findOne({
        owner: userEmail,
        _id,
      });
      if (existingProject) {
        existingProject.projectName =
          projectName || existingProject.projectName;
        existingProject.companyName =
          companyName || existingProject.companyName;
        existingProject.membersId = members || existingProject.membersId;
        existingProject.tags = tags || existingProject.tags;
        existingProject.completed =
          completed !== undefined ? completed : existingProject.completed;

        await existingProject.save();
        await existingProject.populate("members");
        return res.json({
          message: "Project updated successfully.",
          data: existingProject,
        });
      }
      return res.status(400).json({ message: "failed to perform task" });
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "POST") {
    try {
      const user = await createProjectAccessControl(req, res);
      await validateCreateProject(req, res);

      const userEmail = user?.email;

      const data: Project = {
        projectName: req.body.projectName,
        companyName: req.body.companyName,
        tags: req.body.tags,
        membersId: req.body.members,
        owner: userEmail,
        completed: false,
      };

      const newProject = new ProjectModel(data);
      await newProject.save();

      await newProject.populate("members");

      return res
        .status(201)
        .json({ message: "project created successfully", data: newProject });
    } catch (error) {
      responseError(error, res);
    }
  }

  if (req.method == "GET") {
    try {
      const user = await getProjectAccessControl(req, res);
      const userRoles = user?.["http://localhost:3000/roles"];
      const userId = user?.sub;

      let projects;
      if (userRoles.includes("admin")) {
        projects = await ProjectModel.find().populate("members");
        return res.json({
          message: "Projects retrieved successfully",
          data: projects,
        });
      } else {
        projects = await ProjectModel.find({
          membersId: { $in: [userId] },
        }).populate("members");
        return res.json({
          message: "Projects retrieved successfully",
          data: projects,
        });
      }
    } catch (error) {
      responseError(error, res);
    }
  }
};

export default withApiAuthRequired(handler);
