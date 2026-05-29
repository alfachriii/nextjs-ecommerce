"use client";

import { getOrders } from "@/app/actions/order";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { myToast } from "@/lib/myToast";
import { Order, OrderStatus } from "@/sanity/types";
import Image from "next/image";
import illustration from "@/images/banner/empty_order.svg";
import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";

export const StatusBadge = ({
   status,
   size = "xs",
}: {
   status: OrderStatus;
   size?: "xs" | "sm" | "md";
}) => {
   switch (status) {
      case "UNPAID":
         return (
            <div
               className={`w-fit p-1 px-4 bg-amber-200 border-2 border-amber-300 rounded-full text-amber-950 text-${size}`}
            >
               Waiting for payment
            </div>
         );
      case "PAID":
         return (
            <div
               className={`w-fit p-1 px-4 bg-blue-200 border-2 border-blue-300 rounded-full text-blue-950 text-${size}`}
            >
               Paid
            </div>
         );
      case "SHIPPED":
         return (
            <div
               className={`w-fit p-1 px-4 bg-orange-200 border-2 border-orange-300 rounded-full text-orange-950 text-${size}`}
            >
               Being Delivered
            </div>
         );
      case "COMPLETED":
         return (
            <div
               className={`w-fit p-1 px-4 bg-green-200 border-2 border-green-300 rounded-full text-green-950 text-${size}`}
            >
               Completed
            </div>
         );
      case "FAILED":
         return (
            <div
               className={`w-fit p-1 px-4 bg-red-200 border-2 border-red-300 rounded-full text-red-950 text-${size}`}
            >
               Failed
            </div>
         );
      default:
         break;
   }
};

const OrderList = () => {
   const [isPending, startTransition] = useTransition();
   const [orders, setOrders] = useState<Order[] | []>([]);

   const handleGetOrders = () => {
      startTransition(async () => {
         try {
            const orders = await getOrders();
            setOrders(orders);
         } catch (error) {
            myToast.error(`${error}`);
         }
      });
   };

   useEffect(() => {
      handleGetOrders();

      return () => {
         handleGetOrders();
      };
   }, []);

   return orders.length === 0 ? (
      <div className="flex flex-col gap-8 w-full h-screen items-center justify-center">
         <div className="w-1/2 h-auto flex">
            <Image src={illustration} alt="Order Empty" />
         </div>
         <h2>There is no order history yet..</h2>
      </div>
   ) : (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead>Order ID</TableHead>
               <TableHead>Date</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Items</TableHead>
               <TableHead>Total</TableHead>
               <TableHead>Action</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {orders.map((order, index) => (
               <TableRow
                  key={index}
                  onClick={() => redirect(`/order/${order.orderId}`)}
               >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                     {/* {order._createdAt.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "2-digit",
                     })} */}
                     {`${order._createdAt}`}
                  </TableCell>
                  <TableCell>
                     <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                     <a href={`/order/${order.orderId}`}>Detail</a>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};

export default OrderList;
