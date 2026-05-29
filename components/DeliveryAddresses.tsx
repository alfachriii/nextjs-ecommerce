"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
   Field,
   FieldContent,
   FieldDescription,
   FieldLabel,
} from "@/components/ui/field";
import AddNewDeliveryAddressModal from "./AddNewDeliveryAddressModal";
import { useDeliveryAddressState } from "@/store";
import { getDeliveryAddresses } from "@/app/actions/deliveryAddress";
import { myToast } from "@/lib/myToast";

const DeliveryAddresses = () => {
   const [isVisible, setIsVisible] = useState<boolean>(false);
   const [isPending, startTransition] = useTransition();
   const {
      getAddresses,
      setAddresses,
      setSelectedAddress,
      getSelectedAddress,
   } = useDeliveryAddressState();
   const addresses = getAddresses();
   const selectedAddress = getSelectedAddress();

   const handleGetAddresses = () => {
      startTransition(async () => {
         try {
            const addresses = await getDeliveryAddresses();
            if (!addresses) return;

            console.log(addresses);
            setAddresses(addresses);
         } catch (error) {
            myToast.error(`error get addresses: ${error}`);
         }
      });
   };

   useEffect(() => {
      handleGetAddresses();

      return () => {
         handleGetAddresses();
      };
   }, []);

   return (
      <div className="bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 p-4 pt-6 gap-4 rounded-xl">
         <h2 className="font-semibold">Delivery Addresses</h2>
         <RadioGroup
            defaultValue={
               selectedAddress && selectedAddress?.phone + selectedAddress?.city
            }
         >
            {!(addresses.length === 0) ? (
               addresses.map((addr, index) => (
                  <Field key={index} orientation="horizontal">
                     <RadioGroupItem
                        onClick={() => setSelectedAddress(addr)}
                        value={addr.phone + addr.city}
                        id={`${index}${addr.addressee}`}
                     />
                     <FieldContent>
                        <FieldLabel htmlFor="desc-r1">
                           {addr.addressee}
                        </FieldLabel>
                        <FieldDescription className="flex flex-col text-secondary-foreground">
                           <span>{addr.phone}</span>
                           <span>{addr.address}</span>
                           <span>{addr.city}</span>
                           <span>{addr.postalCode}</span>
                        </FieldDescription>
                     </FieldContent>
                  </Field>
               ))
            ) : (
               <p className="text-sm text-secondary-foreground">
                  No shipping address yet
               </p>
            )}
         </RadioGroup>
         <Button variant="outline" onClick={() => setIsVisible(true)}>
            Add new address
         </Button>
         {isVisible && (
            <AddNewDeliveryAddressModal setIsVisible={setIsVisible} />
         )}
      </div>
   );
};

export default DeliveryAddresses;
