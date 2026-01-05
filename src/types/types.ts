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
