import { type SchemaTypeDefinition } from 'sanity'
import { memberType } from './memberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType],
}
