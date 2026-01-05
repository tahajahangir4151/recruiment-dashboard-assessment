export interface CountryData {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  cca2: string;
}

export interface Recruitment {
  id: string;
  recruitmentName: string;
  candidates: number;
  startDate: string;
  status: "In Progress" | "Completed" | "Draft" | "Archived";
}

export interface ChangeStatusProps {
  id: string;
  status: Recruitment["status"];
}

export const STATUS_OPTIONS: Recruitment["status"][] = [
  "In Progress",
  "Completed",
  "Draft",
  "Archived",
];

export type Tab = "Active" | "Archived" | "Draft";

export interface HandleSaveProp {
  recruitmentName: string;
  jobRole: string;
  level: string;
  otherRole?: string;
  description?: string;
}

export interface FormState {
  recruitmentName: string;
  jobRole: string;
  level: string;
  otherRole: string;
  description: string;
}

export interface AddRecruitmentPayload {
  recruitmentName: string;
  jobRole: string;
  level: string;
  otherRole?: string;
  description?: string;
}
