import banner1 from "@/images/banner/banner_2.svg"
import banner2 from "@/images/banner/banner_3.svg"
import banner3 from "@/images/banner/banner_4.svg"
import Image from "next/image"

const AboutBanner = () => {
  return (
    <div className="w-1/3 grid grid-cols-2 grid-rows-2 gap-8">
        <div className="row-span-2 flex">
            <Image src={banner3} alt="banner" className="w-full h-full scale-75 object-cover" />
        </div>
        <div className="flex w-full">
            <Image src={banner2} alt="banner" className="w-full h-full object-cover" />
        </div>
        <div className="flex w-full">
            <Image src={banner1} alt="banner" className="w-full h-full object-cover" />
        </div>
    </div>
  )
}

export default AboutBanner