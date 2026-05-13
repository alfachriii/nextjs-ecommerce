'use client'

import HomeTabber from './HomeTabber'
import ProductCard from './ProductCard'

const ProductGrid = () => {
  return (
    <div className='w-full flex flex-col gap-8 mb-8'>
        <HomeTabber selectedTab="gadget" onTabSelect={(tab) => console.log(tab)} />
        <div className='grid grid-cols-5 gap-4 w-full'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
  )
}

export default ProductGrid