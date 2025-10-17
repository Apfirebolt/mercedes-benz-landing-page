import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Credentials are used to generate the necessary form fields
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      
      // This is the core function where you validate credentials
      async authorize(credentials) {
        
        // 1. Make a POST request to your Express backend's login endpoint
        const expressLoginUrl = process.env.EXPRESS_API_BASE_URL + '/api/auth/login';

        const res = await fetch(expressLoginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } 
        
        // 3. Return null if user validation failed (NextAuth will handle the error)
        return null;
      }
    }),
  ],
  callbacks: {
    // 1. Add user data (like user ID) to the JWT
    async jwt({ token, user }) {
      if (user) {
        // user here is the object returned by the 'authorize' function above
        token.id = user.id;
        token.email = user.email; // Add other properties as needed
      }
      return token;
    },
    // 2. Add the ID from the JWT to the session object
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };