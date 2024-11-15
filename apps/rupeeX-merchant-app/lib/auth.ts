import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
  providers:[
    CredentialsProvider({
      name:"RupeeX Merchant Login",
      credentials:{
        email: { label: "Email", type: "text", placeholder: "you@example.com", required: true },
        password: { label: "Password", type: "password", required: true }        
      },
      async authorize(credentials: any) {
          const { email, password } = credentials || {};
          const existingMerchant = await db.merchant.findUnique({
            where:{
              email: email
            }
          });

          if(!existingMerchant){
            throw new Error("No merchant found with this email.");
          }

          if(!existingMerchant.password || !(await bcrypt.compare(password, existingMerchant.password))){
            throw new Error("Invalid credentials.");
          }

          return {
            id: existingMerchant.id.toString(),
            email: existingMerchant.email,
            name: existingMerchant.name
          }
      }
      
    })
  ],
  callbacks:{
    async session({session, token}: any){
      session.user.id = token.id;
      return session;
    },
    async jwt({token, user}: any){
      if(user){
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_URL || "secret",
  pages:{
    signIn:"/auth/sinIn",
    signOut:"/auth/singout"
  },
}