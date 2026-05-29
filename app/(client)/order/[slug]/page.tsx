"use client";

import Container from "@/components/Container";
import fallbackProduct from "@/images/product_fallback_image.png";
import Image from "next/image";
import Link from "next/link";
import { FaTruck } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { RiErrorWarningLine } from "react-icons/ri";
import { StatusBadge } from "@/components/OrderList";
import { useEffect, useState, useTransition } from "react";
import { Order } from "@/sanity/types";
import { getOrderById } from "@/app/actions/order";
import { notFound, useParams } from "next/navigation";
import { myToast } from "@/lib/myToast";
import PriceFormatter from "@/components/PriceFormatter";
import PriceView from "@/components/PriceView";
import { dateFormatter } from "@/lib/utils";

const OrderDetailPage = () => {
   const [isPending, startTransition] = useTransition();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [order, setOrder] = useState<Order | null>(null);
   const { slug: orderId } = useParams<{ slug: string }>();

   const handleGetOrderDetail = () => {
      if (!orderId) return;
      startTransition(async () => {
         try {
            setIsLoading(true);
            const order = await getOrderById(orderId);
            console.log("order data: ", order);
            setOrder(order);
         } catch (error) {
            myToast.error(`${error}`);
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      });
   };

   useEffect(() => {
      handleGetOrderDetail();
      console.log(order);

      return () => {
         handleGetOrderDetail();
      };
   }, [orderId]);

   if (isPending || isLoading) return <p>Loading...</p>;
   if (!order) return notFound();

   return (
      <main>
         <Container>
            <div></div>
            <div className="w-full min-h-screen flex flex-col gap-2 pt-32 pb-8">
               {!order && isPending ? (
                  <p>Loading...</p>
               ) : (
                  <>
                     <div className="flex gap-8">
                        <h1 className="text-2xl font-semibold">
                           Order Details
                        </h1>
                        <StatusBadge status={order.status} size="md" />
                     </div>
                     <p className="text-secondary-foreground">
                        {`Order ID: #${order.orderId} • ${dateFormatter(order._createdAt)}`}
                     </p>
                     <div className="w-full min-h-screen grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col gap-4">
                           <div className="w-full flex flex-col rounded-lg overflow-hidden border-2 border-foreground/30">
                              <div className="w-full grid grid-cols-6 p-4 bg-secondary">
                                 <div className="col-span-3 flex gap-4">
                                    <p>Products</p>
                                 </div>
                                 <div className="w-full">
                                    <p>Quantity</p>
                                 </div>
                                 <div className="w-full">
                                    <p>Price</p>
                                 </div>
                                 <div className="w-full">
                                    <p>Total Price</p>
                                 </div>
                              </div>
                              {order.items.map((item, index) => (
                                 <div
                                    key={index}
                                    className="w-full grid grid-cols-6 px-4 not-first:border-t-2 border-t-2 border-foreground/20 py-4"
                                 >
                                    <div className="col-span-3 flex gap-4">
                                       <Link
                                          href={`/product/${item.url}`}
                                          className="aspect-w-1 aspect-h-1 h-16 border-2 border-foreground/20 rounded-sm overflow-hidden"
                                       >
                                          <Image
                                             src={
                                                item.image_url ??
                                                fallbackProduct
                                             }
                                             alt="product image"
                                             width={300}
                                             height={300}
                                             className="w-full h-full object-cover"
                                          />
                                       </Link>
                                       <div>
                                          <p>{item.name}</p>
                                          <p className="text-sm text-secondary-foreground">
                                             {item.brand}
                                          </p>
                                       </div>
                                    </div>
                                    <div className="w-full h-full flex items-center">
                                       {item.quantity}
                                    </div>
                                    <div className="w-full h-full flex items-center">
                                       <PriceFormatter amount={item.price} />
                                    </div>
                                    <div className="w-full h-full flex items-center">
                                       <PriceFormatter
                                          amount={item.price * item.quantity}
                                       />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                           <div className="w-full flex flex-col border-2 border-foreground/30 rounded-lg overflow-hidden">
                              <div className="flex gap-4 not-first:border-t-2 border-foreground/30 p-4 bg-secondary">
                                 <FaTruck className="text-2xl text-chart-5" />
                                 <p>Shipping & Billing</p>
                              </div>
                              <div className="not-first:border-t-2 border-foreground/30 px-4 py-2">
                                 <p className="text-sm text-secondary-foreground">
                                    Customer
                                 </p>
                                 <p className="text-lg font-semibold">
                                    {order.customer.name}
                                 </p>
                                 <p className="text-sm text-secondary-foreground">
                                    {order.customer.email}
                                 </p>
                                 <p className="text-sm text-secondary-foreground">
                                    {order.shippingAddress.phone}
                                 </p>
                              </div>
                              <div className="not-first:border-t-2 border-foreground/30 px-4 py-2">
                                 <p className="text-sm text-secondary-foreground">
                                    Delivering Address
                                 </p>
                                 <p className="text-sm text-secondary-foreground">
                                    {`${order.shippingAddress.address}, ${order.shippingAddress.city}. ${order.shippingAddress.postalCode}`}
                                 </p>
                              </div>
                           </div>
                           <div className="w-full flex flex-col border-2 border-foreground/30 rounded-lg overflow-hidden">
                              <div className="flex gap-4 not-first:border-t-2 border-foreground/30 p-4 bg-secondary">
                                 <MdOutlinePayment className="text-2xl text-chart-5" />
                                 <p>Payment Summary</p>
                              </div>
                              <div className="flex flex-col text-sm text-secondary-foreground not-first:border-t-2 border-foreground/30 p-4">
                                 <div className="w-full flex justify-between">
                                    <p>Subtotal ({order.items.length})</p>
                                    <PriceFormatter
                                       amount={order.totalAmount}
                                    />
                                 </div>
                                 <div className="w-full flex justify-between">
                                    <p>Shipping costs</p>
                                    <p>Rp 0</p>
                                 </div>
                              </div>
                              <div className="flex flex-col text-sm text-secondary-foreground not-first:border-t-2 border-foreground/30 p-4">
                                 <div className="w-full flex justify-between p-4">
                                    <p>Total</p>
                                    <PriceFormatter
                                       amount={order.totalAmount}
                                    />
                                 </div>
                                 {order.status === "UNPAID" ? (
                                    <>
                                       <Button className="flex mt-8 p-6 text-lg">
                                          Pay Now
                                       </Button>
                                       <div className="flex gap-2 items-center mt-4 text-red-500">
                                          <RiErrorWarningLine />
                                          <p className="text-xs">
                                             Waiting for payment
                                          </p>
                                       </div>
                                    </>
                                 ) : (
                                    <div className="bg-secondary p-4">
                                       <p className="text-secondary-foreground">
                                          Payment Method
                                       </p>
                                       <p className="font-semibold">
                                          Transfer Bank - BCA
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </Container>
      </main>
   );
};

export default OrderDetailPage;
