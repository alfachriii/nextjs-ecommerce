import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const ProductCharacteristics = () => {
  return (
    <Accordion className="group">
        <AccordionItem value="details">
            <AccordionTrigger className="text-md font-semibold group-hover:cursor-pointer">Macbook Pro 13 Inch</AccordionTrigger>
            <AccordionContent>
                <p className='flex items-center justify-between'>
                    Brand:
                    <span className='tracking-wide font-semibold'>Apple</span>
                </p>
                <p className='flex items-center justify-between'>
                    Collection:
                    <span className='tracking-wide font-semibold'>2025</span>
                </p>
                <p className='flex items-center justify-between'>
                    Type:
                    <span className='tracking-wide font-semibold'>Laptop</span>
                </p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics