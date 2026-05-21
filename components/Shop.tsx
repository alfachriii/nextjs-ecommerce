'use client'

import Container from './Container'
import ProductCard from './ProductCard'
import CategoryList from './shop/CategoryList'
import BrandList from './shop/BrandList'
import PriceList from './shop/PriceList'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getMinMaxPrice } from '@/lib/utils'
import { getProductByFilter } from '@/sanity/services'
import { BrandResult, CategoryResult, ProductResult } from '@/sanity/types'

interface Props {
    categories: CategoryResult[];
    brands: BrandResult[];
}

const Shop = ({ categories, brands }: Props) => {
    const searchParams = useSearchParams();
    const brandParams = searchParams?.get("brand");
    const categoryParams = searchParams?.get("category");

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductResult[]>();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let minPrice = 0;
            let maxPrice = 100000000;
            
            if (selectedPrice) {
                const [min, max] = getMinMaxPrice(selectedPrice);

                if (max <= 0) {
                    minPrice = Math.max(0, min);
                } else {
                    minPrice = Math.max(0, min);
                    maxPrice = max;
                }
            }

            console.log("min price: ", minPrice);
            console.log("max price: ", maxPrice);
            const data = await getProductByFilter({
                selectedCategory, selectedBrand, minPrice, maxPrice
            })
            setProducts(data);
        } catch (error) {
            console.log("Shop product fetching Error: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
    fetchProducts();
    }, [selectedCategory, selectedBrand, selectedPrice]);

    return (
      <Container className="flex flex-cols">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="w-full flex border-t-2 border-secondary-foreground/30">
              <div className="w-1/5 flex flex-col min-h-screen p-4 border-r-2 border-secondary-foreground/30 gap-8">
                  <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                  <BrandList brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
                  <PriceList selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
              </div>
              <div className="w-4/5 max-h-[200vh] grid grid-cols-4 gap-4 p-4 overflow-auto">
                {loading ? (
                    <span>LOADING BOSSS..</span>
                    ) : products?.length ? (
                      products?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                      ))
                    ) : (
                    <>

                    <span>{products?.length}</span>
                    <span>Produk kosong, Boss!</span>
                    </>
                )}
              </div>
          </div>
      </Container>
    )
}

export default Shop