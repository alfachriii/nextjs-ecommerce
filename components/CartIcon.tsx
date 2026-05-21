"use client";
import { useCart } from "@/hooks/useCart";
import { useStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const CartIcon = () => {
   const { handleGetProductItems, getGroupedItems } = useCart();
   const { items } = useStore();

   useEffect(() => {
      const currentItems = getGroupedItems();
      if (currentItems.length > 0) return;
      
      handleGetProductItems();
   }, []);

   console.log(items);

   return (
      <Link href="/cart" className="relative hoverEffect hover:text-chart-1">
         <IoCartOutline className="text-2xl" />
         <span className="absolute -top-2 -right-2 text-xs p-0.5 px-1 rounded-xl bg-chart-5 text-primary-foreground">
            {items.length ? items.length : 0}
         </span>
      </Link>
   );
};

export default CartIcon;
