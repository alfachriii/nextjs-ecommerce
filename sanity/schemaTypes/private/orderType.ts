import { defineField, defineType } from "sanity";

export const orderType = defineType({
   name: "order",
   title: "Order",
   type: "document",
   fields: [
      defineField({
         name: "orderId",
         title: "Order ID",
         type: "string",
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: "userId",
         title: "User ID",
         type: "string",
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: "customer",
         title: "Customer Info",
         type: "object",
         fields: [
            defineField({
               name: "name",
               type: "string",
               title: "Name",
               validation: (Rule) => Rule.required(),
            }),
            defineField({
               name: "email",
               type: "string",
               title: "Email",
               validation: (Rule) => Rule.required(),
            }),
         ],
      }),
      defineField({
         name: "shippingAddress",
         title: "Shipping Address",
         type: "object",
         fields: [
            defineField({
               name: "addressee",
               title: "Addressee",
               type: "string",
               validation: (Rule) => Rule.required(),
            }),
            defineField({
               name: "phone",
               title: "Phone Number",
               type: "string",
               validation: (Rule) => Rule.required(),
            }),
            defineField({
               name: "address",
               title: "Address",
               type: "string",
               validation: (Rule) => Rule.required(),
            }),
            defineField({
               name: "postalCode",
               title: "Postal Code",
               type: "string",
               validation: (Rule) => Rule.required(),
            }),
            defineField({
               name: "city",
               title: "City",
               type: "string",
               validation: (Rule) => Rule.required().min(1),
            }),
         ],
      }),
      defineField({
         name: "items",
         title: "Items Purchased",
         type: "array",
         of: [
            {
               type: "object",
               fields: [
                  defineField({
                     name: "productId",
                     title: "Product ID",
                     type: "string",
                  }),
                  defineField({
                     name: "name",
                     title: "Product Name",
                     type: "string",
                  }),
                  defineField({
                     name: "quantity",
                     type: "number",
                     title: "Quantity",
                     validation: (Rule) => Rule.required().min(1),
                  }),
                  defineField({
                     name: "price",
                     type: "number",
                     title: "Price at Purchase",
                     validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                     name: "image_url",
                     title: "Image Url",
                     type: "string",
                  }),
                  defineField({
                     name: "url",
                     title: "Product Url",
                     type: "string",
                  }),
               ],
            },
         ],
      }),
      defineField({
         name: "totalAmount",
         title: "Total Amount",
         type: "number",
         validation: (Rule) => Rule.required(),
      }),
      defineField({
         name: "status",
         title: "Order Status",
         type: "string",
         validation: (Rule) => Rule.required(),
         options: {
            list: [
               { title: "Waiting for payment", value: "UNPAID" },
               { title: "Payment success", value: "PAID" },
               { title: "Order being delivered", value: "SHIPPED" },
               { title: "Order Complete", value: "COMPLETED" },
               { title: "Failed / Canceled", value: "FAILED" },
            ],
            layout: "radio",
         },
         initialValue: "UNPAID",
      }),
      defineField({
         name: "midtransToken",
         title: "Midtrans Snap Token",
         type: "string",
         validation: (Rule) => Rule.required(),
         description: "Disimpan jika user ingin melanjutkan pembayaran nanti",
      }),
      defineField({
         name: "midtransRedirectLink",
         title: "Midtrans Redirect Link",
         type: "string",
         description: "Disimpan jika user ingin melanjutkan pembayaran nanti",
      }),
   ],
});
