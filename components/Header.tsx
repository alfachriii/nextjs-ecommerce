
import Container from './Container'
import Link from 'next/link'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import CartIcon from './CartIcon'
import SearchBar from './SearchBar'
import UserButton from './UserButton'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'

const Header = async () => {
    let session = null;
    const cookie = (await cookies()).get('session')?.value;
    
    if (cookie) {
      session = await decrypt(cookie);
    }

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