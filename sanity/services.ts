import { client } from "./lib/client";
import { PRODUCTS_BY_VARIANT_QUERY } from "./queries/query";

const getProductsByVariant = async (variant: string, quantity: number) => {

    try {
        const data = await client.fetch(
            PRODUCTS_BY_VARIANT_QUERY,
            { variant, quantity }
        )
        return data ?? []
    } catch (error) {
        console.log("Error fetching products by variant: ", error);
        return [];
    }
}

export {
    getProductsByVariant
}