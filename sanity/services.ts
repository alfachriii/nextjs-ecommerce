import { client } from "./lib/client";

const getProductsByVariant = async (variant: string, quantity: number) => {
    const query = `*[_type == "product" && variant == $variant][0...$quantity]{
      ...,"categories": categories[]->title
    }`

    try {
        const data = await client.fetch(
            query,
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