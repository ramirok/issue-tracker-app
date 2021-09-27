import * as mongoose from "mongoose";

export interface Comment {
  owner: string;
  content: string;
  ticketId: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<Comment>(
  {
    owner: { type: String, required: true },
    content: { type: String, required: true },
    ticketId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

commentSchema.virtual("creator", {
  ref: "User",
  localField: "owner",
  foreignField: "user_id",
  justOne: true,
});

commentSchema.set("toJSON", { virtuals: true });

// const CommentModel = mongoose.model<Comment>("Comment", commentSchema);

// export default CommentModel;

export default mongoose.models.Comment ||
  mongoose.model<Comment>("Comment", commentSchema);
