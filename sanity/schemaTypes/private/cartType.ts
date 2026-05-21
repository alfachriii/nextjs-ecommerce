import { defineType, defineField } from 'sanity'

export const cartType = defineType({
  name: 'cart',
  title: 'Shopping Cart',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'cartItem',
          title: 'Cart Item',
          fields: [
            defineField({
              name: 'productId',
              title: 'Product ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          
          preview: {
            select: {
              title: 'productId',
              subtitle: 'quantity',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: `Product: ${title}`,
                subtitle: `Qty: ${subtitle}`,
              }
            },
          },
        },
      ],
    }),
  ],
})