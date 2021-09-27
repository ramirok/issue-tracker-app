import mongoose from "mongoose";
import { TicketPriority, TicketType } from "../utils/types";
import { User } from "./userData.model";

export interface Ticket {
  type: TicketType;
  priority: TicketPriority;
  projectId: mongoose.Schema.Types.ObjectId;
  name: string;
  details: string;
  steps?: string;
  assigned: User[];
  creator: string;
  completed: boolean;
}

const ticketSchema = new mongoose.Schema<Ticket>(
  {
    type: {
      type: String,
      enum: [TicketType.bug, TicketType.feature],
      required: true,
    },
    priority: {
      type: String,
      enum: [TicketPriority.high, TicketPriority.mid, TicketPriority.low],
      required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    steps: { type: String, required: false },
    assigned: [{ type: String, required: true }],
    creator: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toObject: { virtuals: true } }
);

ticketSchema.virtual("members", {
  ref: "User",
  localField: "assigned",
  foreignField: "user_id",
  justOne: false,
});

ticketSchema.virtual("project", {
  ref: "Project",
  localField: "projectId",
  foreignField: "_id",
  justOne: true,
});

ticketSchema.set("toJSON", { virtuals: true });

// const TicketModel = mongoose.model<Ticket>("Ticket", ticketSchema);

// export default TicketModel;

export default mongoose.models.Ticket ||
  mongoose.model<Ticket>("Ticket", ticketSchema);
