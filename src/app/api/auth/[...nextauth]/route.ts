import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // Remove authorization block for basic testing
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("SignIn callback:", { account, profile });
      if (!profile?.email) {
        throw new Error("No profile");
      }
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      return session;
    },
  },
  // Add debug for testing
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code, metadata) {
      console.log("NextAuth Debug:", code, metadata);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };