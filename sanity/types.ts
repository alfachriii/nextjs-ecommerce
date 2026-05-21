import { Product as SanityProduct, Category as SanityCategory, Brand as SanityBrand } from "@/sanity.types";

export type ProductImagesType = Array<{
      _key: string;
      _type: "image";
      url: string | null;
      lqip: string | null;
   }>; 

export type ProductResult = Omit<SanityProduct, "images"> & {
   images: ProductImagesType
} | null;

export type ProductBySlug = ProductResult & {
   brandName: string | null;
}

export type CategoryResult = Omit<SanityCategory, "image"> & {
   image: {
    _key: null;
    _type: "image";
    url: string | null;
    lqip: string | null;
  };
  productCount: number;
} | null;

export type BrandResult = Omit<SanityBrand, "images"> & {
   image: {
    _key: null;
    _type: "image";
    url: string | null;
    lqip: string | null;
  };
}


export type ItemsCart = Array<{
   _key: string;
   productId: string,
   quantity: number;
}> | null

export type ItemsCartResult = {
   items: Array<{
   _key: string;
   productId: string,
   quantity: number;
   }> | null
} | null

export type Cart = {
   _id: string;
   _type: "product";
   _createdAt: string;
   _updatedAt: string;
   items: ItemsCart;
   userId: string;
}
