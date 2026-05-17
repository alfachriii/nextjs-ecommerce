import { Category, Product } from "@/sanity.types";
import { sanityFetch } from "../lib/live";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  CATEGORIES_QUERY,
  CATEGORIES_WITH_QUANTITY_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_QUERY,
} from "./query";

const isWithQuantityParams = (quantity: number | undefined) => {
    if(quantity) {
      return CATEGORIES_WITH_QUANTITY_QUERY;
    } 
    return CATEGORIES_QUERY;
}

const getCategories = async (quantity?: number) => {
  try {
    const query = isWithQuantityParams(quantity);

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    }) as { data: Category[] | null };
    
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

const getAllProducts = async () => {
    try {
        const { data } = await sanityFetch({ query: PRODUCTS_QUERY });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching all products: ", error);
        return [];
    }
}

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = (await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    })) as { data: Product | null };

    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export {
    getAllProducts,
    getCategories,
    getAllBrands,
    getProductBySlug,
    getBrand,
    getMyOrders,
};