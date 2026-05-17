'use client'

import Container from './Container'
import ProductCard from './ProductCard'
import CategoryList from './shop/CategoryList'
import BrandList from './shop/BrandList'
import PriceList from './shop/PriceList'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { getAllBrands, getCategories } from '@/sanity/queries'

const Shop = async () => {
    const categories = await getCategories();
    const brands = await getAllBrands();
    const searchParams = useSearchParams();
    const brandParams = searchParams?.get("brand");
    const categoryParams = searchParams?.get("category");

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);

    return (
      <Container className="flex flex-cols">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="w-full flex border-t-2 border-secondary-foreground/30">
              <div className="w-1/5 flex flex-col min-h-screen p-4 border-r-2 border-secondary-foreground/30 gap-8">
                  <CategoryList />
                  <BrandList />
                  <PriceList />
              </div>
              <div className="w-4/5 max-h-[200vh] grid grid-cols-4 gap-4 p-4 overflow-auto">
                  <ProductCard />
              </div>
          </div>
      </Container>
    )
}

export default Shop