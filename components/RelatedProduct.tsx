import ProductCard from "./ProductCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"


const RelatedProduct = () => {
  return (
    <div className="w-full flex flex-col py-8 gap-4">
        <h2 className="text-3xl font-bold">Related Products</h2>
        <Carousel className="w-full">
            <CarouselContent>
                <CarouselItem className="w-full grid grid-cols-5 gap-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default RelatedProduct