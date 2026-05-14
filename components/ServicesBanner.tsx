import { FiTruck } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { RiRecycleLine } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";

const ServicesBanner = () => {
  return (
    <div className='grid grid-cols-4 p-4 shadow-lg shadow-muted'>
      <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
        <FiTruck className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
        <div>
          <p className='text-md font-medium'>Free Delivery</p>
          <p className='text-sm text-secondary-foreground'>Free shipping over 50rb</p>
        </div>
      </div>
      <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
        <BiSupport className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
        <div>
          <p className='text-md font-medium'>Customer Support</p>
          <p className='text-sm text-secondary-foreground'>Friendly 27/7 customer support</p>
        </div>
      </div>
      <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
        <RiRecycleLine className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
        <div>
          <p className='text-md font-medium'>Free Return</p>
          <p className='text-sm text-secondary-foreground'>Free shipping over 50rb</p>
        </div>
      </div>
      <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
        <AiOutlineFileProtect className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
        <div>
          <p className='text-md font-medium'>Money Back guarantee</p>
          <p className='text-sm text-secondary-foreground'>Quality checked by our team</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesBanner