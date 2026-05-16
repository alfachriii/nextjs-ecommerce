import { type SchemaTypeDefinition } from 'sanity'

import {authorType} from './authorType'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { brandType } from './brandType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, brandType, authorType],
}
