import Link from 'next/link'
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi'

const SocialMedia = ({ className }: {className?: string}) => {
  return (
    <div className='flex gap-4'>
        <Link href="/" className={`p-3 rounded-full border-2 border-secondary-foreground text-secondary-foreground group` + className}>
            <FiGithub className='group-hover:text-primary' />
        </Link>
        <Link href="/" className={`p-3 rounded-full border-2 border-secondary-foreground text-secondary-foreground group` + className}>
            <FiInstagram className='group-hover:text-primary' />
        </Link>
        <Link href="/" className={`p-3 rounded-full border-2 border-secondary-foreground text-secondary-foreground group` + className}>
            <FiLinkedin className='group-hover:text-primary' />
        </Link>
    </div>
  )
}

export default SocialMedia