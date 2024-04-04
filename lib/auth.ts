import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        });
        if (existingUser && existingUser.auth_type === "password") {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password || ""
          );
          if (passwordValidation) {
            return {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name,
              isAdmin: existingUser.isAdmin,
            };
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET || "",
  callbacks: {
    signIn: async ({ user, account } : any) => {
      if (user.email) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email,
            auth_type: account.provider,
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              auth_type: account.provider,
            },
          });
        }
      }
      return true;
    },
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};

