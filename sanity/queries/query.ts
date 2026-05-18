import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) {
    ..., 
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },    
}`);

const PRODUCTS_BY_VARIANT_QUERY = defineQuery(`*[_type == "product" && variant == $variant][0...$quantity]{
    ...,
    "categories": categories[]->title, 
    images[] {
        _key,
        _type,
        "url": asset->url,
        "lqip": asset->metadata.lqip
    }
}`)

const PRODUCTS_BY_FILTER_QUERY = defineQuery(`*[_type == 'product' 
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
    }`)

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0] {
    ...,
    "brandName": brand->title,
    images[] {
    _key,
    _type,
    "url": asset->url,
    "lqip": asset->metadata.lqip
    }
  }`
);

const CATEGORIES_QUERY = defineQuery(`*[_type == 'category'] | order(name asc) {
    ...,
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },
    "productCount": count(*[_type == "product" && references(^._id)])
}`);

const CATEGORIES_WITH_QUANTITY_QUERY = defineQuery(`*[_type == 'category'][0...$quantity] | order(name asc) {
    ...,
    image {
      _key,
      _type,
      "url": asset->url,
      "lqip": asset->metadata.lqip
    },
    "productCount": count(*[_type == "product" && references(^._id)])
}`);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
...,products[]{
  ...,product->
}
}`);

const PRODUCTS_QUERY = `*[_type == "product"] | order(name asc){
  ...,"categories": categories[]->title
}`

export {
  PRODUCTS_BY_VARIANT_QUERY,
  PRODUCTS_BY_FILTER_QUERY,
  PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  CATEGORIES_WITH_QUANTITY_QUERY,
  BRANDS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
};