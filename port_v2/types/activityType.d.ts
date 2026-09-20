export interface Activity {
  /** "github": the profile's contribution calendar. "repository": a snapshot of this repo's git history. */
  source: "github" | "repository";
  /** ISO date (YYYY-MM-DD) of the first day, always a Sunday. */
  start: string;
  /** One entry per day from `start`; length is a multiple of 7. */
  days: number[];
}
