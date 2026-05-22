"use client";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { LuMinus, LuPlus } from "react-icons/lu";
import { ProductResult } from "@/sanity/types";
import { useStore } from "@/store";
import { useCart } from "@/hooks/useCart";

interface Props {
   product: ProductResult;
   isPending: boolean;
}

const Counter = ({ product, isPending }: Props) => {
   if (!product) return null;

   const { handleAddItem, handleDecreaseItemQuantity } = useCart();
   const { getItemCount } = useStore();
   const itemCount = getItemCount(product?._id);
   
   return (
      <ButtonGroup className="border-2 border-secondary-foreground/30 rounded-xl">
         <Button
            variant="ghost"
            size="icon"
            disabled={itemCount === 1 || isPending}
            onClick={() => handleDecreaseItemQuantity(product?._id)}
         >
            <LuMinus />
         </Button>
         <input
            className="w-16 text-foreground font-mono flex items-center px-4 pl-6"
            value={itemCount}
            disabled
         />
         <Button variant="ghost" onClick={() => handleAddItem(product)} disabled={isPending}>
            <LuPlus />
         </Button>
      </ButtonGroup>
   );
};

export default Counter;
