"use client";
import { useState, useTransition } from "react";
import { IoIosClose } from "react-icons/io";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AddressData } from "@/sanity/types";
import { addNewDeliveryAddress } from "@/app/actions/deliveryAddress";
import { Button } from "./ui/button";
import { useDeliveryAddressState } from "@/store";
import { myToast } from "@/lib/myToast";

const AddNewDeliveryAddressModal = ({
   setIsVisible,
}: {
   setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const { addAddress } = useDeliveryAddressState();
   const [isPending, startTransition] = useTransition();

   const [addressee, setAddressee] = useState<string>("");
   const [phone, setPhone] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [city, setCity] = useState<string>("");
   const [postalCode, setPostalCode] = useState<string>("");

   const handleAddNewAddress = () => {
      try {
         startTransition(async () => {
            const addressData: AddressData = {
               address: address,
               phone: phone,
               addressee: addressee,
               city: city,
               postalCode: postalCode,
            };
            await addNewDeliveryAddress(addressData);

            addAddress(addressData);

            myToast.success("Success add new address");
         });
      } catch (error) {
         myToast.error(`error add new addresses: ${error}`);
      }
   };

   return (
      <div
         onClick={() => setIsVisible(false)}
         className="fixed z-10 bg-foreground/50 w-screen h-screen flex items-center justify-center right-0 bottom-0 "
      >
         <div
            onClick={(e) => e.stopPropagation()} 
            className="z-20 flex flex-col w-1/3 h-auto p-4 gap-2 bg-background rounded-lg ">
            <div className="w-full flex items-center justify-between">
               <p>New Delivery Address</p>
               <IoIosClose
                  onClick={() => setIsVisible(false)}
                  className="text-3xl hover:cursor-pointer"
               />
            </div>
            <form action="" className="flex flex-col gap-2">
               <Label className="mt-4">Addressee's</Label>
               <Input
                  value={addressee}
                  onChange={(e) => setAddressee(e.target.value)}
                  required
                  placeholder="e.g. John"
               />
               <Label className="mt-4">Phone Number</Label>
               <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="e.g. 62 812 343 567"
               />
               <Label className="mt-4">Address</Label>
               <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. 123 Main Street"
               />
               <Label className="mt-4">City</Label>
               <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="e.g. South Jakarta"
               />
               <Label className="mt-4">Postal Code</Label>
               <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  placeholder="e.g. 12290"
               />
               <Button
                  onClick={handleAddNewAddress}
                  disabled={isPending}
                  className="mt-4">Add Address</Button>
            </form>
         </div>
      </div> 
   );
};

export default AddNewDeliveryAddressModal;
