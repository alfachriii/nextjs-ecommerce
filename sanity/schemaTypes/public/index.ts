import { type SchemaTypeDefinition } from 'sanity'

import { authorType} from './authorType'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { brandType } from './brandType'

export const publicSchema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, brandType, authorType],
}
