import { type SchemaTypeDefinition } from "sanity";
import heroType from "./hero";
import aboutType from "./about";
import certiType from "./certification";
import categoryType from "./category";
import blogType from "./blog";
import projectType from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, aboutType, certiType, categoryType, blogType, projectType],
};
