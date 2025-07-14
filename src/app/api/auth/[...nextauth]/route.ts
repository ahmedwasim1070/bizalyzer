import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/business.manage",
        },
      },
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

    async jwt({ token, account }) {
      if (account) {
        // First time login: store access token
        token.accessToken = account.access_token;

        // 🔥 TEST: Call Google Business Profile API
        try {
          const res = await fetch(
            `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${account.providerAccountId}/locations`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          if (!res.ok) {
            const text = await res.text(); // log raw HTML response
            console.error("❌ Business API Error Response (non-JSON):", text);
          } else {
            const data = await res.json();
            console.log("✅ Business Profile API Response:", data);
          }
        } catch (err) {
          console.error("❌ Error fetching business profile:", err);
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },

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
