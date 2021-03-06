export interface Bug {
  _id: number;
  name: string;
  details: string;
  steps: string;
  version: string;
  priority: number;
  assigned: string;
  creator: string;
  time: string;
}

export interface Project {
  _id: string;
  projectName: string;
  companyName: string;
  createdAt: string;
  tags: string[];
  members: User[];
  completed: boolean;
}

export interface User {
  email: string;
  name: string;
  picture: string;
  user_id: string;
  roles: string[];
  createdAt: string;
}

export interface Ticket {
  _id: string;
  type: TicketType;
  priority: TicketPriority;
  project: Project;
  name: string;
  details: string;
  steps?: string;
  members: User[];
  creator: string;
  createdAt: string;
  completed: boolean;
}

export interface CommentInterface {
  _id: string;
  content: string;
  owner: string;
  ticketId: string;
  createdAt: string;
  creator: User;
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

export enum UserRole {
  admin = "Admin",
  pm = "Project Manager",
  dev = "Developer",
}
