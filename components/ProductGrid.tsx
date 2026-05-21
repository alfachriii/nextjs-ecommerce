'use client'

import { useEffect, useState } from 'react'
import HomeTabber from './HomeTabber'
import ProductCard from './ProductCard'
import { getProductsByVariant } from '@/sanity/services'
import { ProductResult } from '@/sanity/types'

const ProductGrid = () => {
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [selectedTab, setSeletectedTab] = useState<string>("gadget");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await getProductsByVariant(selectedTab, 10);
      setProducts(response);
      setLoading(false);
    }

    fetchData();
  }, [selectedTab]);
  
  return (
    <div className='w-full flex flex-col gap-8 mb-8'>
        <HomeTabber selectedTab={selectedTab} setSelectedTab={setSeletectedTab} />
        <div className='grid grid-cols-5 gap-4 w-full'>
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
  )
}

export default ProductGrid