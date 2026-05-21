
import Container from './Container'
import Link from 'next/link'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import CartIcon from './CartIcon'
import SearchBar from './SearchBar'
import UserButton from './UserButton'
import { verifySession } from '@/lib/dal'

const Header = async () => {
    const session = await verifySession();

    return (
      <header className='fixed top-0 left-0 right-0 border-b-2 border-accent py-4 bg-background/40 backdrop-blur-lg z-50'>
          <Container>
              <nav className='flex w-full items-center justify-between text-sm'>
                  <Logo />
                  <HeaderMenu />
                  <div className='relative flex items-center gap-4 font-medium text-sm'>
                      <SearchBar />
                      <CartIcon />
                      {session && <UserButton /> }
                      {!session && <Link href="/signin" className='hoverEffect hover:text-chart-1'>Sign in</Link>  }
                  </div>
              </nav>
          </Container>
      </header>        
    )
}

export default Header