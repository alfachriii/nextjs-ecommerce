import Image from "next/image";
import PriceView from "./PriceView";
import { Button } from "./ui/button";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { PRODUCTS_BY_VARIANT_QUERY_RESULT } from "@/sanity.types";
import { generateImageUrl, limitString } from "@/lib/utils";

type ProductResult = Omit<PRODUCTS_BY_VARIANT_QUERY_RESULT[0], "images"> & {
    images?: Array<{
      _key: string;
      _type: "image";
      url: string;
      lqip: string;
    }>;
}

const ProductCard = ({ product }: { product: ProductResult} ) => {
    
    return (
      <article className='w-full h-fit border-2 border-accent-foreground/20 rounded-lg flex shrink-0 flex-col group'>
          <Link href={`/product/${product?.slug?.current}`}>
              {product?.images && product.images.length > 0 && (
                  <div className='aspect-w-2 aspect-h-3 shrink-0 bg-secondary rounded-tl-lg rounded-tr-lg overflow-hidden'>
                      <Image 
                          src={generateImageUrl(product.images[0].url, 600)} 
                          alt={`${product.name} image`} 
                          width={600}
                          height={600}
                          placeholder="blur"
                          blurDataURL={product.images[0].lqip}
                          className='w-full h-full scale-115 object-cover hover:cursor-pointer group-hover:scale-125 transition-transform hoverEffect' />
                  </div>
              )}
              <div className="w-full h-fit flex flex-col p-4 gap-2">
                  <p className='text-xs font-normal text-muted-foreground'>
                      {product?.categories?.map((cat) => cat).join(", ")}
                  </p>
                  {product?.name && (
                    <h3 className='text-md font-bold text-foreground'>{limitString(product?.name, 20)}</h3>
                  )}
                  <div className="flex gap-2">
                      <p className="text-sm font-medium">In Stock</p>
                      <p className="text-sm font-semibold text-chart-5">{product?.stock}</p>
                  </div>
                  <PriceView price={product?.price} discount={product?.discount} />
                  <Button className="w-3/4 rounded-full gap-3 hover:cursor-pointer hover:bg-chart-5 hoverEffect">
                      <span className="scale-125"><IoCartOutline /></span>
                      <p className="text-base">Add to Cart</p>
                  </Button>
              </div>
          </Link>
      </article>
    )
}

export default ProductCard