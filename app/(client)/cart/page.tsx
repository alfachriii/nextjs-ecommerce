import Container from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import Cart from "@/components/Cart";
import CartEmpty from "@/components/CartEmpty";

const CartPage = async () => {
   const session = await verifySession();
   if(!session) return redirect("/signin");

   return (
      <main className="w-full min-h-screen my-24">
         <Container>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Cart />
         </Container>
      </main>
   );
};

export default CartPage;
