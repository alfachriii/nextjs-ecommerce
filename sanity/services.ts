import { client } from "./lib/client";

const getProductsByVariant = async (variant: string, quantity: number) => {
    // const query = `*[_type == "product" && variant == $variant][0...$quantity]{
    //   ...,"categories": categories[]->title
    // }`
    const query = `*[_type == "product" && variant == $variant][0...$quantity]{
      ...,"categories": categories[]->title, images[] {
          _key,
          _type,
          "url": asset->url,
          "lqip": asset->metadata.lqip
          }
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