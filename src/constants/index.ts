export const MODES = {
  BUILDER: "builder",
  VIEWER: "viewer",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];