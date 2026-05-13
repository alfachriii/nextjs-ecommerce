import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { categoriesData, quickLinksData } from '@/constants/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='border-t-2 border-accent-foreground/20'>
        <Container>
            <FooterTop />
            <div className='grid grid-cols-4 py-8'>
                <div className='flex flex-col'>
                    <Logo />
                    <p className='text-sm text-secondary-foreground mb-4'>Building a bridge between technological innovation and modern lifestyle needs through a safe, smart and inclusive e-commerce platform for all.</p>
                    <SocialMedia />
                </div>
                <div className='flex flex-col px-4'>
                    <h3 className='text-md text-extrabold'>Quick Links</h3>
                    <ul>
                        {quickLinksData.map((item) => (
                            <li key={item.title} className='text-sm text-secondary-foreground mt-4'>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col px-4'>
                    <h3 className='text-md text-extrabold'>Categories</h3>
                    <ul>
                        {categoriesData.map((item) => (
                            <li key={item.title} className='text-sm text-secondary-foreground mt-4'>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
        <div className='w-full flex justify-center border-t-2 border-accent-foreground/20 p-4'>
            <span className='flex text-sm text-secondary-foreground'>
                <p>
                    © {new Date().getFullYear()} <Link href="https://www.alfachri.web.id" target="_blank" rel="noopener noreferrer" className='font-bold'>alfachri.</Link> All
                    rights reserved.
                </p>
            </span>
        </div>
    </footer>
  )
}

export default Footer