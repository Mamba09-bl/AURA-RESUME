// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import signup from "@/modules/signup";
import { connectDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, profile }) {
      await connectDB();

      const existing = await signup.findOne({ email: user.email });

      if (!existing) {
        await signup.create({
          username: user.name,
          email: user.email,
          provider: "google",
          providerId: profile.sub,
        });
      }

      return true;
    },

    async session({ session }) {
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/Resumes`; // ⚠️ must match folder name exactly
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
