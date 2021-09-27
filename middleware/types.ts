import { NextApiRequest } from "next";

export interface AuthRequest extends NextApiRequest {
  user?: {
    sub: string;
    "http://localhost:3000/email": string;
    "http://localhost:3000/picture": string;
    "http://localhost:3000/name": string;
    "http://localhost:3000/roles": string;
  };
}

export enum TicketType {
  feature = "Feature",
  bug = "Bug",
}

export enum TicketPriority {
  low = "Low",
  mid = "Mid",
  high = "High",
}
