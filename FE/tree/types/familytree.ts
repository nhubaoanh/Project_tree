export interface FamilyMember {
  id: string | number;
  mid?: string | number; // Mother ID
  fid?: string | number; // Father ID
  pids?: (string | number)[]; // Partner IDs
  name: string;
  title?: string; // Role/Title
  gender: "male" | "female";
  photo?: string;
  birthDate?: string;
  deathDate?: string;
  [key: string]: any;
}

export enum ViewMode {
  DIAGRAM = "diagram",
  ADD_MEMBER = "add",
  HISTORY = "history",
  SETTINGS = "settings",
  PHA_KY = "phaky",
  NEWS = "news",
}
