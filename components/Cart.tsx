"use client";

import { Button } from "@/components/ui/button";
import PriceFormatter from "@/components/PriceFormatter";
import Separator from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
   Field,
   FieldContent,
   FieldDescription,
   FieldLabel,
} from "@/components/ui/field";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";
import CartEmpty from "./CartEmpty";
import { useStore } from "@/store";
import CartItem from "./CartItem";

const Cart = () => {
   const { getGroupedItems, getSubTotalPrice, getTotalPrice } = useStore();
   const { handleGetProductItems } = useCart();

   useEffect(() => {
      handleGetProductItems();
   }, []);

   const groupedItems = getGroupedItems();

   if (!groupedItems) return null;

   return (
      <>
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
                     <Button className="rounded-2xl" size="lg">
                        Proceed to Checkout
                     </Button>
                  </div>
                  <div className="bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 p-4 pt-6 gap-4 rounded-xl">
                     <h2 className="font-semibold">Delivery Addresses</h2>
                     <RadioGroup>
                        <Field orientation="horizontal">
                           <RadioGroupItem value="default" id="desc-r1" />
                           <FieldContent>
                              <FieldLabel htmlFor="desc-r1">
                                 My Address
                              </FieldLabel>
                              <FieldDescription>
                                 Jakarta, ID. Lorem ipsum dolor sit amet
                                 consectetur.
                              </FieldDescription>
                           </FieldContent>
                        </Field>
                        <Field orientation="horizontal">
                           <RadioGroupItem value="default" id="desc-r1" />
                           <FieldContent>
                              <FieldLabel htmlFor="desc-r1">
                                 My Address
                              </FieldLabel>
                              <FieldDescription>
                                 Jakarta, ID. Lorem ipsum dolor sit amet
                                 consectetur.
                              </FieldDescription>
                           </FieldContent>
                        </Field>
                        <Field orientation="horizontal">
                           <RadioGroupItem value="default" id="desc-r1" />
                           <FieldContent>
                              <FieldLabel htmlFor="desc-r1">
                                 My Address
                              </FieldLabel>
                              <FieldDescription>
                                 Jakarta, ID. Lorem ipsum dolor sit amet
                                 consectetur.
                              </FieldDescription>
                           </FieldContent>
                        </Field>
                     </RadioGroup>
                     <Button variant="outline">Add new address</Button>
                  </div>
               </div>
            </div>
         ) : (
            <CartEmpty />
         )}
      </>
   );
};

export default Cart;
