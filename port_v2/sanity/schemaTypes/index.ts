import { type SchemaTypeDefinition } from "sanity";
import heroType from "./hero";
import aboutType from "./about";
import certiType from "./certification";
import categoryType from "./category";
import blogType from "./blog";
import projectType from "./project";
import educationType from "./education";
import experienceType from "./experience";
import embedType from "./objects/embed-block";
import videoBlockType from "./objects/video-block";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    aboutType,
    certiType,
    categoryType,
    blogType,
    projectType,
    educationType,
    experienceType,
    embedType,
    videoBlockType,
  ],
};
