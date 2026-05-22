'use client'
import { headerData } from '@/constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderMenu = () => {
    const pathname = usePathname();

  return (
    <div className='flex gap-8 font-semibold font-sans'>
        {headerData.map((item) => (
            <Link key={item.href} href={item.href} className={`group relative hoverEffect hover:text-chart-1 ${pathname === item?.href && "text-chart-1"}`}>
                {item.title}
                <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-chart-1 group-hover:w-1/2 hoverEffect group-hover:left-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-chart-1 group-hover:w-1/2 hoverEffect group-hover:right-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
            </Link>
        ))}
    </div>
  )
}

export default HeaderMenu