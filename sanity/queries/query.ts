import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = `*[_type == "product"] | order(name asc){
  ...,"categories": categories[]->title
}`;

export const PRODUCTS_BY_IDS_QUERY =
   defineQuery(`*[_type == "product" && _id in $ids]{ 
    ..., 
    "categories": categories[]->title,
    images[] {
        _key,
        _type,
        "url": asset->url,
        "lqip": asset->metadata.lqip
    } 
}`);

export const PRODUCT_BY_ID_QUERY = defineQuery(
   `*[_type == "product" && _id == $productId][0]`,
);

export const PRODUCTS_BY_VARIANT_QUERY =
   defineQuery(`*[_type == "product" && variant == $variant][0...$quantity]{
    ...,
    "categories": categories[]->title, 
    images[] {
        _key,
        _type,
        "url": asset->url,
        "lqip": asset->metadata.lqip
    }
}`);

export const PRODUCTS_BY_FILTER_QUERY = defineQuery(`*[_type == 'product' 
    && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
    && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
    && price >= $minPrice && price <= $maxPrice] 
      | order(name asc) {
            ...,
            "categories": categories[]->title,
            images[] {
            _key,
            _type,
            "url": asset->url,
            "lqip": asset->metadata.lqip
        } 
    }`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(
   `*[_type == "product" && slug.current == $slug] | order(name asc) [0] {
    ...,
    "brandName": brand->title,
    images[] {
    _key,
    _type,
    "url": asset->url,
    "lqip": asset->metadata.lqip
    }
  }`,
);

export const CATEGORIES_QUERY =
   defineQuery(`*[_type == 'category'] | order(name asc) {
    ...,
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },
    "productCount": count(*[_type == "product" && references(^._id)])
}`);

export const CATEGORIES_WITH_QUANTITY_QUERY =
   defineQuery(`*[_type == 'category'][0...$quantity] | order(name asc) {
    ...,
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },
    "productCount": count(*[_type == "product" && references(^._id)])
}`);

export const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) {
    ..., 
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },    
}`);

export const BRAND_QUERY =
   defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

export const CART_BY_ID_QUERY = defineQuery(
   `*[_type == "cart" && _id == $cartId][0]`,
);

export const ADDRESSES_BY_USER_ID = defineQuery(
   `*[_type == "address" && userId == $userId] {
      addressee,
      phone,
      address,
      city,
      postalCode
   }`,
);

export const ORDER_BY_ID = defineQuery(`
   *[_type == "order" && _id == $id][0]
`);

export const ORDERS_BY_USER_ID = defineQuery(
   `*[_type == "order" && userId == $userId] | order(_createdAt asc)`,
);
