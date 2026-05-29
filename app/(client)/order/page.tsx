import Container from "@/components/Container";
import OrderList from "@/components/OrderList";

const OrderPage = () => {
   return (
      <main>
         <Container>
            <div className="min-h-screen w-full flex flex-col pt-32">
               <div className="w-11/12 mx-auto">
                  <h1 className="mb-4 text-xl font-semibold">Order History</h1>
                  <OrderList />
               </div>
            </div>
         </Container>
      </main>
   );
};

export default OrderPage;
