"use client"

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/app/actions/auth';

const SignUpForm = () => {
    const [state, action, pending] = useActionState(signUp, undefined)
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  return (
    <Card className='w-full'>
        <CardHeader className='w-full flex flex-col items-center'>
            <CardTitle className='text-2xl font-bold'>Create your account</CardTitle>
            <CardDescription>Welcome! Please fill in the details to get started.</CardDescription>
            <div className='w-full flex justify-center gap-4 my-4'>
                <Button variant="outline" className="grow">
                    <FaGithub />
                    Github
                </Button>
                <Button variant="outline" className="grow">
                    <FcGoogle />
                    Google
                </Button>
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
                      {state?.errors?.email && <p>{state.errors.email}</p>}
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
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
                        {state?.errors?.password && (
                          <div>
                            <p>Password must:</p>
                            <ul>
                              {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <input 
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
                    </div>
                </div>
                {state?.messages && <p>{state.messages}</p>}
                <Button type='submit' className="w-full mt-8 hover:cursor-pointer" size="lg">
                    Continue
                    <IoMdArrowDropright />
                </Button>
            </form>
        </CardContent>
        <CardFooter className='w-full flex flex-col gap-4'>
            <p className='flex gap-2 text-secondary-foreground'>
                Already have an account? 
                <Link href="/signin" className='font-medium'>Sign in</Link>
            </p>
        </CardFooter>
    </Card>
  )
}

export default SignUpForm