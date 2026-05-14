import AboutBanner from '@/components/AboutBanner'
import Container from '@/components/Container'
import ServicesBanner from '@/components/ServicesBanner'

const AboutPage = () => {
  return (
    <main className='min-h-screen mt-32 mb-32'>
        <Container className='flex flex-cols gap-8 h-full items-center justify-center'>
            <h1 className='text-4xl font-bold'>About Us</h1>
            <span className='w-2/3'>
                <p className='text-center text-secondary-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, repellat aliquam pariatur illum debitis velit cupiditate tenetur officiis sint recusandae itaque laboriosam doloribus, a, assumenda eum asperiores optio possimus placeat!</p>
            </span>
            <AboutBanner />
            <div className='w-2/3 grid grid-cols-3 p-4 mt-8 mb-8 border-2 border-secondary-foreground/30 rounded-full'>
                <div className='p-4 px-8 gap-4 flex items-center text-wrap'>
                    <p className='text-2xl font-bold'>100K+</p>
                    <p className='text-secondary-foreground'>High ranking product</p>
                </div>
                <div className='p-4 px-8 gap-4 flex items-center text-wrap border-x-2 border-secondary-foreground/30'>
                    <p className='text-2xl font-bold'>100K+</p>
                    <p className='text-secondary-foreground'>High ranking product</p>
                </div>
                <div className='p-4 px-8 gap-4 flex items-center text-wrap'>
                    <p className='text-2xl font-bold'>100K+</p>
                    <p className='text-secondary-foreground'>High ranking product</p>
                </div>
            </div>
            <ServicesBanner />
        </Container>
    </main>
  )
}

export default AboutPage