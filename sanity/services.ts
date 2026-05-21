import { client } from "./lib/client";
import { PRODUCTS_BY_FILTER_QUERY, PRODUCTS_BY_VARIANT_QUERY } from "./queries/query";
import { ProductResult } from "./types";

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

const getProductByFilter = async (params: object) => {
    try {
        const data = await client.fetch(
            PRODUCTS_BY_FILTER_QUERY,
            params,
            { next: { revalidate: 0 } }
        )
        return data ?? []
    } catch (error) {
        console.log("Error fetching products by filter: ", error);
        return []
    }
}

export {
    getProductsByVariant,
    getProductByFilter
}