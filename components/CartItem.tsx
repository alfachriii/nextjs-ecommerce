"use client";

import { generateImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import Counter from "./Counter";
import PriceFormatter from "./PriceFormatter";
import { CartItem as CartItemType } from "@/store";
import fallbackProductImage from "@/images/product_fallback_image.png";
import { useCart } from "@/hooks/useCart";
import Loading from "./Loading";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
   const { handleDeleteItem, loading } = useCart();
   console.log(loading);
   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <div
               key={cartItem.product?._id}
               className="w-full flex gap-4 p-4 border-b-2 border-secondary-foreground/30"
            >
               <Link
                  href={`/product/${cartItem.product?.slug?.current}`}
                  className="aspect-w-1 aspect-h-1 w-1/4 bg-secondary/50 border-2 border-secondary-foreground/30 rounded-lg group"
               >
                  {cartItem.product?.images[0].url &&
                     cartItem.product?.images[0].lqip && (
                        <Image
                           src={
                              generateImageUrl(
                                 cartItem.product?.images[0].url,
                                 400,
                              ) ?? fallbackProductImage
                           }
                           alt={cartItem.product?.name ?? "Product Image"}
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
                           {cartItem.product?.categories
                              ?.map((cat) => cat)
                              .join(", ")
                              .toLocaleUpperCase()}
                        </p>
                        <h3 className="text-2xl font-semibold">
                           {cartItem.product?.name}
                        </h3>
                     </div>
                     <button>
                        =
                        <IoTrashOutline
                           onClick={() =>
                              handleDeleteItem(cartItem?.product?._id ?? "")
                           }
                           className="text-2xl hover:cursor-pointer hover:text-red-500 hoverEffect"
                        />
                        =
                     </button>
                  </div>
                  <div className="w-full flex items-baseline justify-between">
                     <Counter
                        product={cartItem.product}
                        isPending={loading}
                     />
                     <PriceFormatter
                        amount={cartItem.product?.price}
                        className="font-bold text-xl"
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default CartItem;
