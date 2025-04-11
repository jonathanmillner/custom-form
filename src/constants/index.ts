export const MODES = {
  BUILDER: "builder",
  VIEWER: "viewer",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];

export const API_BASE_URL = "http://localhost:8080";
