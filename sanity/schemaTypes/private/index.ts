import { SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { accountType } from "./accountType";
import { cartType } from "./cartType";


export const privateSchema: { types: SchemaTypeDefinition[] } = {
  types: [userType, accountType, cartType],
}