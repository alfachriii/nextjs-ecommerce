import Counter from "./Counter";
import PriceFormatter from "./PriceFormatter";
import { Button } from "./ui/button";
import { IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import fallbackProductImage from "@/images/product_fallback_image.png";
import { CartItem } from "@/store";
import { generateImageUrl } from "@/lib/utils";

interface Props {
   cartItems: CartItem[] | [];
}

const CartItems = ({ cartItems }: Props) => {
   if (!cartItems || cartItems.length === 0) return null;
   return (
      <div className="col-span-2 bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 rounded-xl">
         {cartItems.map((item) => (
            <div key={item.product?._id} className="w-full flex gap-4 p-4 border-b-2 border-secondary-foreground/30">
               <Link
                  href={`/product/${item.product?.slug?.current}`}
                  className="aspect-w-1 aspect-h-1 w-1/4 bg-secondary/50 border-2 border-secondary-foreground/30 rounded-lg group"
               >
                  {item.product?.images[0].url && item.product?.images[0].lqip && (
                  <Image
                     src={generateImageUrl(item.product?.images[0].url, 400) ?? fallbackProductImage}
                     alt={item.product?.name ?? "Product Image"}
                     width={400}
                     height={400}
                     className="w-full h-full object-cover group-hover:scale-115 hoverEffect"
                  />
                  )}
               </Link>
               <div className="w-3/4 flex flex-col gap-8">
                  <div className="w-full flex justify-between">
                     <div>
                        <p className="text-sm text-secondary-foreground">
                           {item.product?.categories?.map((cat) => cat).join(", ").toLocaleUpperCase()}
                        </p>
                        <h3 className="text-2xl font-semibold">
                           {item.product?.name}
                        </h3>
                     </div>
                     <button>
                        <IoTrashOutline className="text-2xl hover:cursor-pointer hover:text-red-500 hoverEffect" />
                     </button>
                  </div>
                  <div className="w-full flex items-baseline justify-between">
                     <Counter />
                     <PriceFormatter
                        amount={item.product?.price}
                        className="font-bold text-xl"
                     />
                  </div>
               </div>
            </div>
         ))}
         <div className="w-full p-6">
            <Button variant="destructive">Reset Cart</Button>
         </div>
      </div>
   );
};

export default CartItems;
