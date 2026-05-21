"use client"

import { ProductResult } from "@/sanity/types";
import { Button } from "./ui/button";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/hooks/useCart";

interface Props {
   product: ProductResult
}

const AddToCartButton = ({ product }: Props) => {
   const { handleAddItem } = useCart();

   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleAddItem(product)
   }
   return (
      <Button 
         onClick={handleButtonClick}
         className="w-3/4 rounded-full gap-3 hover:cursor-pointer hover:bg-chart-5 hoverEffect">
         <span className="scale-125">
            <IoCartOutline />
         </span>
         <p className="text-base">Add to Cart</p>
      </Button>
   );
};

export default AddToCartButton;
