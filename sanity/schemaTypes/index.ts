import { type SchemaTypeDefinition } from 'sanity'

import { authorType} from './authorType'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { brandType } from './brandType'
import { userType } from './userType'
import { accountType } from './accountType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, brandType, authorType, userType, accountType],
}
