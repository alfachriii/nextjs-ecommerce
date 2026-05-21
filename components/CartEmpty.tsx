import Image from "next/image";
import emptyCartImage from "@/images/banner/empty_cart.svg";
import { Button } from "./ui/button";
import Link from "next/link";

const CartEmpty = () => {
   return (
      <div className="w-full pt-16 flex flex-col gap-4 items-center">
         <div className="aspect-w-1 aspect-h-1 w-1/4">
            <Image src={emptyCartImage} alt="Empty cart" />
         </div>
         <h2 className="text-4xl font-semibold mt-8">
            Your cart is feeling lonely
         </h2>
         <div className="w-1/3">
            <p className="text-center text-secondary-foreground">
               It looks like you haven't added anything to your cart yet. Let's
               change that and find some amazing products for you!
            </p>
         </div>
         <Link href="/" className="w-1/3">
            <Button variant="outline" size="lg" className="w-full rounded-full font-semibold hover:bg-foreground hover:text-background hoverEffect">
               Discover Products
            </Button>
         </Link>
      </div>
   );
};

export default CartEmpty;
