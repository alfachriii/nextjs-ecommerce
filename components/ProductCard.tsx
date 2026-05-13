import productImage from "@/images/product/product_1.png";
import Image from "next/image";
import PriceView from "./PriceView";
import { Button } from "./ui/button";
import { IoCartOutline } from "react-icons/io5";

const ProductCard = () => {
  return (
    <article className='w-full min-h-50 border-2 border-accent-foreground/20 rounded-lg flex flex-col group'>
        <div className='aspect-w-2 aspect-h-3 bg-secondary rounded-tl-lg rounded-tr-lg overflow-hidden'>
            <Image src={productImage} alt="product1" className='w-full h-full scale-115 object-cover hover:cursor-pointer group-hover:scale-125 transition-transform hoverEffect' />
        </div>
        <div className="w-full h-fit flex flex-col p-4 gap-2">
            <p className='text-xs font-normal text-muted-foreground'>GADGET ACCESSORIES</p>
            <h3 className='text-md font-bold text-foreground'>Macbook Pro 13 inch</h3>
            <div className="flex gap-2">
                <p className="text-sm font-medium">In Stock</p>
                <p className="text-sm font-semibold text-chart-5">8</p>
            </div>
            <PriceView price={32999000} discount={38899000} />
            <Button className="w-3/4 rounded-full gap-3 hover:cursor-pointer hover:bg-chart-5 hoverEffect">
                <span className="scale-125"><IoCartOutline /></span>
                <p className="text-base">Add to Cart</p>
            </Button>
        </div>
    </article>
  )
}

export default ProductCard