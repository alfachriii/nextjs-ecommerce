"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ButtonGroup } from "./ui/button-group";
import { LuMinus, LuPlus } from "react-icons/lu";

const AddToCartSection = () => {
   return (
      <>
         <div className="flex justify-between items-center">
            <p className="text-secondary-foreground">Quantity</p>
            <ButtonGroup className="border-2 border-secondary-foreground/30 rounded-xl">
               <Button
                  variant="ghost"
                  size="icon"
               >
                  <LuMinus />
               </Button>
               <input
                  className="w-16 text-foreground font-mono flex items-center px-4 pl-6"
                  disabled
               />
               <Button variant="ghost" >
                  <LuPlus />
               </Button>
            </ButtonGroup>
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
