"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { codeInput } from "@sanity/code-input";
import { presentationTool } from "sanity/presentation";
import * as resolve from "@/sanity/plugins/resolve";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: "id", title: "Indonesia" },
        { id: "en", title: "English" },
        { id: "de", title: "Deutsch" },
      ],
      schemaTypes: [
        "hero",
        "about",
        "blog",
        "project",
        "education",
        "experience",
      ],
      // Make language field available as "language" instead of "__i18n_lang"
      languageField: "language",
    }),
    unsplashImageAsset(),
    codeInput(),
  ],
});
