"use server";
import { FormState, SignupFormSchema } from "@/lib/definitions"
import { createSession } from "@/lib/session";
import { secureClient } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

const isExsistingUser = async (email: string) => {
    const user = await secureClient.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (user && user?._id) return true;
    return false
}

const createNewUser = async (email: string, hashedPassword: string) => {
    try {
        const newUser = await secureClient.create({
            _type: "user",
            email,
            hashedPassword
        })
        return newUser
    } catch (error) {
        console.log("Can't create new user with errors: ", error)
    }
}

export const signUp = async (state: FormState, formData: FormData) => {
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
  
    if (!validatedFields.success && !validatedFields.data) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 11);

    if (await isExsistingUser(email)) {
        return { 
            messages: "You already have an account!"
        }
    }

    const newUser = await createNewUser(email, hashedPassword);
    if (!newUser) return {
        messages: "message: 'An error occurred while creating your account.',"
    }
    
    await createSession(newUser._id);

    redirect("/")
} 