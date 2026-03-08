import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id || profile?.sub;
      }
      // Store user info from profile
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.image = profile.picture || profile.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom user info to session
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
