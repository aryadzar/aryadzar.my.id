// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://087fabf3d367c93b9c5aeb14fa2ec9c5@o4508874774151168.ingest.us.sentry.io/4510639596371968",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Every event goes through the /monitoring tunnel, i.e. one Vercel function
  // call each, so production samples 10% of page loads instead of all of them.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  // Session replays upload a chunk every few seconds for as long as the visitor
  // stays, each one a function call through the tunnel. Keep only the replays
  // of sessions that hit an error (below).
  replaysSessionSampleRate: 0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
