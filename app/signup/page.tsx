import SignUpForm from '@/components/SignUpForm'
import banner from '@/images/banner/banner_5.svg'
import { verifySession } from '@/lib/dal';
import Image from 'next/image'
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await verifySession();
  if(session) return redirect("/");

  return (
    <main className='w-full min-h-screen flex items-center px-16'>
      <div className='w-3/5 h-full flex items-center justify-center '>
        <div className="w-1/2">
          <Image src={banner} alt="banner" className="w-full h-full" />
        </div>
      </div>
      <div className='w-2/5 h-full flex items-center px-12'>
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage