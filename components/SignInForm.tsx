'use client'

import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import { FaGithub } from "react-icons/fa";
import FormErrorMessages from "./FormErrorMessages";
import Loading from "./Loading";

const SignInForm = () => {
  const [state, action, pending] = useActionState(signIn, undefined);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  return (
    <Card className='w-full'>
        {pending && <Loading />}
        <CardHeader className='w-full flex flex-col items-center'>
            <CardTitle className='text-2xl font-bold'>Sign In to your account</CardTitle>
            <CardDescription>Welcome back! Please sign in to continue</CardDescription>
            <div className='w-full flex justify-center gap-4 my-4'>
                <a href="/api/auth/github" className="grow">
                  <Button variant="outline" className="w-full">
                        <FaGithub />
                        Github
                  </Button>
                </a>
                <a href="/api/auth/google" className="grow">
                  <Button variant="outline" className="w-full">
                        <FcGoogle />
                        Google
                  </Button>
                </a>
            </div>
            <div className='w-full flex items-center gap-4'>
                <span className='grow border-b-2 border-secondary-foreground/30'></span>
                <p className='shrink text-secondary-foreground'>or</p>
                <span className='grow border-b-2 border-secondary-foreground/30'></span>
            </div>
        </CardHeader>
        <CardContent>
            <form action={action}>
                <div className='flex flex-col gap-6'>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                      <FormErrorMessages errors={state?.errors?.email} />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className='relative'>
                        <Input 
                          className='pr-12'
                          id="password"
                          name="password"
                          type={(isPassVisible === true) ? "text" : "password"}
                          required />
                        <LuEye 
                            className={`absolute text-lg right-4 top-2 hover:cursor-pointer ${!isPassVisible && "hidden"}`}
                            onClick={() => setIsPassVisible(false)} />
                        <LuEyeClosed 
                            className={`absolute text-lg right-4 top-2 hover:cursor-pointer ${isPassVisible && "hidden"}`}
                            onClick={() => setIsPassVisible(true)} />
                      </div>
                      <FormErrorMessages errors={state?.errors?.password} />
                    </div>
                </div>
                <FormErrorMessages errors={state?.messages} />
                <Button type='submit' className="w-full mt-8 hover:cursor-pointer" size="lg" disabled={pending}>
                    Continue
                    <IoMdArrowDropright />
                </Button>
            </form>
        </CardContent>
        <CardFooter className='w-full flex flex-col gap-4'>
            <p className='flex gap-2 text-secondary-foreground'>
                Don't have an account? 
                <Link href="/signup" className='font-medium'>Sign up</Link>
            </p>
        </CardFooter>
    </Card>
  )
}

export default SignInForm