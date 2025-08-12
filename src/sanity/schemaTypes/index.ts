import { type SchemaTypeDefinition } from 'sanity'
import { memberType } from './memberType'
import settingsType from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, settingsType],
}
