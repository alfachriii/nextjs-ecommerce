import { SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { accountType } from "./accountType";


export const privateSchema: { types: SchemaTypeDefinition[] } = {
  types: [userType, accountType],
}