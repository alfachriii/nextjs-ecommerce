import { IoLocationOutline } from 'react-icons/io5'
import { BsClock, BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const FooterTop = () => {
  return (
    <div className='grid grid-cols-4 w-full border-b-2 border-accent-foreground/20 gap-8 p-4 '>
        <div className='flex items-center gap-2'>
            <IoLocationOutline className='text-2xl' />
            <div>
                <p className='text-md font-medium'>Visit Us</p>
                <p className='text-sm text-secondary-foreground'>Jakarta, ID</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <BsTelephone className='text-2xl' />
            <div>
                <p className='text-md font-medium'>Call Us</p>
                <p className='text-sm text-secondary-foreground'>+62 812 345 678</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <BsClock className='text-2xl' />
            <div>
                <p className='text-md font-medium'>Working Hours</p>
                <p className='text-sm text-secondary-foreground'>Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <AiOutlineMail className='text-2xl' />
            <div>
                <p className='text-md font-medium'>Email Us</p>
                <p className='text-sm text-secondary-foreground'>muhamadalfachri78@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

export default FooterTop