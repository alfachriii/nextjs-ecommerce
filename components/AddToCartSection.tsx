"use client"

import Counter from "./Counter";
import { Button } from "./ui/button";
import Link from "next/link";

const AddToCartSection = () => {
   return (
      <>
         <div className="flex justify-between items-center">
            <p className="text-secondary-foreground">Quantity</p>
            <Counter />
         </div>
         <div className="grid grid-cols-2 gap-4 w-full my-4">
            <Button className="py-6">
               <Link href="/" className="text-lg font-mono">
                  BUY NOW
               </Link>
            </Button>
            <Button className="py-6" variant="outline">
               <Link href="/" className="text-lg font-mono">
                  ADD TO CART
               </Link>
            </Button>
         </div>
      </>
   );
};

export default AddToCartSection;
