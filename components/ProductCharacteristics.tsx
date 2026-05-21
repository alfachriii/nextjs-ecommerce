
import { ProductBySlug } from '@/sanity/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const ProductCharacteristics = ({ product }: { product: ProductBySlug }) => {
  return (
    <Accordion className="group">
        <AccordionItem value="details">
            <AccordionTrigger className="text-md font-semibold group-hover:cursor-pointer">{product?.name}</AccordionTrigger>
            <AccordionContent>
                <p className='flex items-center justify-between'>
                    Brand:
                    <span className='tracking-wide font-semibold'>{product?.brandName}</span>
                </p>
                <p className='flex items-center justify-between'>
                    Collection:
                    <span className='tracking-wide font-semibold'>2026</span>
                </p>
                <p className='flex items-center justify-between'>
                    Type:
                    <span className='tracking-wide font-semibold'>{product?.variant}</span>
                </p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics