import { type SchemaTypeDefinition } from 'sanity'
import heroType from './hero'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType],
}
