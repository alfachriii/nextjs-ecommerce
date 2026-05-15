
import Container from './Container'
import ProductCard from './ProductCard'
import CategoryList from './shop/CategoryList'
import BrandList from './shop/BrandList'
import PriceList from './shop/PriceList'

const Shop = () => {
  return (
    <Container className="flex flex-cols">
        <h1 className="text-4xl font-bold">All Products</h1>
        <div className="w-full flex border-t-2 border-secondary-foreground/30">
            <div className="w-1/5 flex flex-col min-h-screen p-4 border-r-2 border-secondary-foreground/30 gap-8">
                <CategoryList />
                <BrandList />
                <PriceList />
            </div>
            <div className="w-4/5 max-h-[200vh] grid grid-cols-4 gap-4 p-4 overflow-auto">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    </Container>
  )
}

export default Shop