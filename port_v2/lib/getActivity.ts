import snapshot from "@/constants/commit-activity.json";
import type { Activity } from "@/types/activityType";

const GITHUB_LOGIN = process.env.GITHUB_USERNAME || "aryadzar";

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount weekday } }
        }
      }
    }
  }
`;

interface CalendarResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: { date: string; contributionCount: number; weekday: number }[];
          }[];
        };
      };
    } | null;
  };
}

/**
 * Daily contribution counts for the About page's skyline.
 *
 * With GITHUB_TOKEN set, this reads the profile's contribution calendar
 * (last 12 months) from the GitHub GraphQL API and caches it for a day.
 * Without a token, or if GitHub fails, it falls back to the committed
 * snapshot of this repository's history (see scripts/commit-activity.mjs).
 */
export async function getActivity(): Promise<Activity> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return snapshot as Activity;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return snapshot as Activity;

    const json = (await res.json()) as CalendarResponse;
    const weeks = json.data?.user?.contributionsCollection.contributionCalendar.weeks;
    if (!weeks || weeks.length === 0) return snapshot as Activity;

    // Flatten to Sunday-first weeks, padding the first and last week to 7 days.
    const days: number[] = [];
    let start = "";
    weeks.forEach((week, i) => {
      const byWeekday = new Array<number>(7).fill(0);
      week.contributionDays.forEach((d) => {
        byWeekday[d.weekday] = d.contributionCount;
        if (i === 0 && !start) {
          const first = new Date(d.date + "T00:00:00Z");
          start = new Date(first.getTime() - d.weekday * 86400000).toISOString().slice(0, 10);
        }
      });
      days.push(...byWeekday);
    });

    return { source: "github", start, days };
  } catch {
    return snapshot as Activity;
  }
}

/** Commits recorded in the committed snapshot of this repository (see scripts/commit-activity.mjs). */
export const REPOSITORY_COMMITS = (snapshot as Activity).days.reduce((sum, n) => sum + n, 0);
