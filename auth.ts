import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { SignInFormSchema } from "./lib/definitions"
import { hashPassword } from "./lib/session"
import { getUser } from "./app/actions/auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
            let user = null
            const validatedFields = SignInFormSchema.safeParse({
                  email: credentials.email,
                  password: credentials.password
            })
    
            if (!validatedFields.success) {
                throw new Error("Invalid credentials.")
            }
            
            const { email, password } = validatedFields.data
            const hashedPassword = await hashPassword(password);
            user = await getUser(email, hashedPassword);
     
            if (!user._id) {
              throw new Error("Invalid credentials.")
            }
     
            return user;
        } catch (error) {
            console.log("login failed: ", error);
            return null;
        }
      },
    }),
  ],
})