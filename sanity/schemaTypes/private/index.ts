import { SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { accountType } from "./accountType";
import { cartType } from "./cartType";
import { orderType } from "./orderType";
import { addressType } from "./addressType";


export const privateSchema: { types: SchemaTypeDefinition[] } = {
  types: [userType, accountType, cartType, orderType, addressType],
}  