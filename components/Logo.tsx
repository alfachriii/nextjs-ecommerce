import Link from 'next/link'
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('group/logo text-2xl font-extrabold tracking-wider', className)}>
        <h2 className='text-chart-5 group-hover/logo:text-chart-1 hoverEffect'>COMMERCE
            <span className='text-chart-1 group-hover/logo:text-chart-5 hoverEffect'>AL</span>
        </h2>
    </Link>
  )
}

export default Logo