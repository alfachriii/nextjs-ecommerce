"use client";

import { Button } from "@/components/ui/button";
import PriceFormatter from "@/components/PriceFormatter";
import Separator from "@/components/ui/separator";

import { useCart } from "@/hooks/useCart";
import { useEffect, useState, useTransition } from "react";
import CartEmpty from "./CartEmpty";
import { useDeliveryAddressState, useStore } from "@/store";
import CartItem from "./CartItem";
import DeliveryAddresses from "./DeliveryAddresses";
import { checkOut } from "@/app/actions/order";
import { myToast } from "@/lib/myToast";
import { redirect } from "next/navigation";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

const Cart = () => {
   const router = useRouter();
   const { getGroupedItems, getSubTotalPrice, getTotalPrice } = useStore();
   const { getSelectedAddress } = useDeliveryAddressState();
   const [isPending, startTransition] = useTransition();
   const { handleGetProductItems } = useCart();
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
      handleGetProductItems();

      return () => {
         handleGetProductItems();
      };
   }, []);

   const groupedItems = getGroupedItems();
   if (!groupedItems || !isMounted) return null;

   const handleCheckOut = () => {
      startTransition(async () => {
         try {
            const totalPrice = getTotalPrice();
            const selectedDeliveryAddress = getSelectedAddress();
            if (!selectedDeliveryAddress)
               throw new Error("Delivery address must be selected.");

            const result = await checkOut(
               totalPrice,
               groupedItems,
               selectedDeliveryAddress,
            );

            window.open(result.trxSessionData.redirect_url, "_blank");
            router.push(`/order/${result.orderId}`);
         } catch (error) {
            console.log("Failed checkout: ", error);
            myToast.error(`${error}`);
         }
      });
   };

   return (
      <>
         {isPending && <Loading />}
         {groupedItems.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-8">
               <div className="col-span-2 bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 rounded-xl">
                  {groupedItems.map((item, index) => (
                     <CartItem key={index} cartItem={item} />
                  ))}
                  <div className="w-full p-6">
                     <Button variant="destructive">Reset Cart</Button>
                  </div>
               </div>
               <div className="flex flex-col h-fit gap-8">
                  <div className="bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 p-4 pt-6 gap-4 rounded-xl">
                     <h2 className="text-2xl font-semibold">Order Summary</h2>
                     <div className="w-full flex justify-between">
                        <p>SubTotal</p>
                        <PriceFormatter
                           amount={getSubTotalPrice()}
                           className="font-semibold"
                        />
                     </div>
                     <div className="w-full flex justify-between">
                        <p>Discount</p>
                        <PriceFormatter
                           amount={getSubTotalPrice() - getTotalPrice()}
                           className="font-semibold"
                        />
                     </div>
                     <Separator />
                     <div className="w-full text-xl font-semibold flex justify-between">
                        <p>Discount</p>
                        <PriceFormatter
                           amount={getTotalPrice()}
                           className="font-semibold"
                        />
                     </div>
                     <Button
                        className="rounded-2xl"
                        size="lg"
                        onClick={handleCheckOut}
                     >
                        Proceed to Checkout
                     </Button>
                  </div>

                  <DeliveryAddresses />
               </div>
            </div>
         ) : (
            <CartEmpty />
         )}
      </>
   );
};

export default Cart;
