

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          
          const res = await axios.post("http://127.0.0.1:5000/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.status === 200 && res.data.user) {
            const user = res.data.user;
            user.token = res.data.token; 
            return user; 
          } else {
            console.warn("Authorization Failed: Invalid credentials.");
            return null; 
          }
        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
          return null; 
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user; 
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.token = token; 
      return session;
    },
  },
});


export { handler as GET, handler as POST };
