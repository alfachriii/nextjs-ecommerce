"use server";
import { FormState, SignupFormSchema } from "@/lib/definitions"
import { comparePassword, createSession, deleteSession, hashPassword } from "@/lib/session";
import { secureClient } from "@/sanity/lib/client";
import { redirect } from "next/navigation";


export const getUser = async (email: string, password?: string) => {
    const query = password 
                    ? `*[_type == "user" && email == $email && password == $password][0]` 
                    : `*[_type == "user" && email == $email][0]`

    try {
        const user = await secureClient.fetch(
            query,
            password ? { email, password } : { email } 
        );
        return user;
    } catch (error) {
        console.log("Error fetching user: ", error);
        return null;
    }
    
}

export const getAccount = async (email: string, accountId: string) => {
    try {
        const user = await secureClient.fetch(
            `*[_type == "account" && email == $email && accountId == $accountId][0]`,
            { email, accountId }
        ) 
        return user; 
    } catch (error) {
        console.log("Error fetching account: ", error);
    }
}

const createNewUser = async (email: string, hashedPassword: string) => {
    try {
        const newUser = await secureClient.create({
            _type: "user",
            email,
            password: hashedPassword,
            image: ""
        })
        return newUser
    } catch (error) {
        console.log("Can't create new user with errors: ", error);
        return null;
    }
}

export const createNewAccount = async (email: string, imageUrl: string, accountId: string) => {
    try {
        const newAccount = await secureClient.create({
            _type: "account",
            email: email,
            image: imageUrl,
            accountId: accountId as string
        })
        return newAccount;
    } catch (error) {
        console.log("Can't create new account with errors: ", error);
        return null;
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
    const hashedPassword = await hashPassword(password);
    const user = await getUser(email);

    if (user?._id) {
        return { 
            messages: "You already have an account!"
        }
    }

    const newUser = await createNewUser(email, hashedPassword);
    if (!newUser) return {
        messages: "An error occurred while creating your account."
    }
    
    await createSession(newUser._id, newUser.email, newUser.image ?? "");

    return redirect("/");
} 

export const signIn = async (state: FormState, formData: FormData) => {
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
    const hashedPassword = await hashPassword(password);
    const user = await getUser(email);
    const isMatch = await comparePassword(password, hashedPassword);

    if (!isMatch) return {
        messages: "Invalid credentials"
    }

    await createSession(user?._id, user.email, user.image ?? "");

    return redirect("/");
}

export async function logout() {
  await deleteSession();
}