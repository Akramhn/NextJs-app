// src/app/api/auth/[...nextauth]/route.js

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
          // Send credentials to your backend API for authentication
          const res = await axios.post("http://127.0.0.1:5000/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.status === 200 && res.data.user) {
            const user = res.data.user;
            user.token = res.data.token; // Store token in the user object
            return user; // Return the user object to NextAuth
          } else {
            console.warn("Authorization Failed: Invalid credentials.");
            return null; // Return null if authorization fails
          }
        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
          return null; // Return null if the request fails
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user; // Attach the user info to the JWT token
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.token = token; // Attach the token info to the session
      return session;
    },
  },
});

// Export named HTTP methods
export { handler as GET, handler as POST };
