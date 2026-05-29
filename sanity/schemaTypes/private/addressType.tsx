import { defineField, defineType } from "sanity";

export const addressType = defineType({
   name: "address",
   title: "User Address",
   type: "document",
   fields: [
      defineField({
         name: "userId",
         title: "User ID",
         type: "string",
         validation: (Rule) => Rule.required(),
      }),
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
});
