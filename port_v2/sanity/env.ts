export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-11-08";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);
export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_TOKEN_WRITE_COMMENT,
  "Missing environment variable: NEXT_PUBLIC_SANITY_TOKEN_WRITE_COMMENT",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
