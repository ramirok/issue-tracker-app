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
  _id: number;
  name: string;
  companyName: string;
  time: string;
  tags: string[];
}
