import { ItemDetails } from "@/app/actions/order";
import {
   Product as SanityProduct,
   Category as SanityCategory,
   Brand as SanityBrand,
   BrandReference,
   CategoryReference,
   Slug,
} from "@/sanity.types";

export type ProductImagesType = Array<{
   _key: string;
   _type: "image";
   url: string | null;
   lqip: string | null;
}>;

export type ProductResult = {
   _id: string;
   _type: "product";
   _createdAt: string;
   _updatedAt: string;
   _rev: string;
   name: string;
   slug: Slug;
   images: ProductImagesType;
   description: string;
   price: number;
   discount: number;
   categories: Array<
      {
         _key: string;
      } & CategoryReference
   >;
   stock: number;
   brand: BrandReference;
   status: "new" | "hot" | "sale";
   variant: "gadget" | "appliances" | "electronics" | "others";
   isFeatured?: boolean;
} | null;

export type ProductBySlug = ProductResult & {
   brandName: string | null;
};

export type CategoryResult =
   | (Omit<SanityCategory, "image"> & {
        image: {
           _key: null;
           _type: "image";
           url: string | null;
           lqip: string | null;
        };
        productCount: number;
     })
   | null;

export type BrandResult = Omit<SanityBrand, "images"> & {
   image: {
      _key: null;
      _type: "image";
      url: string | null;
      lqip: string | null;
   };
};

export type ItemsCart = Array<{
   _key: string;
   productId: string;
   quantity: number;
}> | null;

export type ItemsCartResult = {
   items: Array<{
      _key: string;
      productId: string;
      quantity: number;
   }> | null;
} | null;

export type Cart = {
   _id: string;
   _type: "product";
   _createdAt: string;
   _updatedAt: string;
   items: ItemsCart;
   userId: string;
};

export type AddressData = {
   addressee: string;
   phone: string;
   address: string;
   city: string;
   postalCode: string;
};

export type Address = {
   _id: string;
   _type: "address";
   _createdAt: string;
   _updatedAt: string;
   userId: string;
} & AddressData;

export type Order = {
   _id: string;
   _type: "order";
   _createdAt: string;
   _updatedAt: string;
   orderId: string;
   userId: string;
   customer: {
      name: string;
      email: string;
   };
   shippingAddress: AddressData;
   items: ItemDetails[];
   totalAmount: number;
   status: "UNPAID" | "PAID" | "SHIPPED" | "COMPLETED" | "FAILED";
   midtransToken: string;
   midtransRedirectLink: string;
};

export type OrderStatus = Order["status"];
