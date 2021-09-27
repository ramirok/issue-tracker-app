import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { authorizeMiddleware } from "../../middleware/authorize";
import responseError from "../../middleware/utils/handleError";
import CommentModel, { Comment } from "../../models/comment.model";
import { UserRole } from "../../utils/types";

const CommentAccessControl = authorizeMiddleware(UserRole.dev);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const user = await CommentAccessControl(req, res);

    const userId = user?.sub;
    const data: Comment = {
      content: req.body.content,
      owner: userId,
      ticketId: req.body.ticketId,
    };
    const newComent = new CommentModel(data);
    await newComent.save();
    await newComent.populate("creator");
    res.json({ message: "Comment created successfully.", data: newComent });
  } catch (error) {
    responseError(error, res);
  }
}

export default withApiAuthRequired(handler);
