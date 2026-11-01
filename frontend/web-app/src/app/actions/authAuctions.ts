"use server";
import { NextApiRequest } from "next";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export const getCurrentUser = async (): Promise<User | undefined> => {
  try {
    const session = await getSession();

    if (!session) return undefined;

    return session.user as User;
  } catch (error) {
    console.log("Error fetching session", error);
  }
};

export async function getTokenWorkaround() {
  const rawHeaders = await headers();
  const headerEntries: [string, string][] = Array.from(rawHeaders.entries());

  const rawCookies = await cookies();
  const cookieEntries: [string, string][] = rawCookies
    .getAll()
    .map((c) => [c.name, c.value]);

  const req = {
    // next-auth expects plain objects for headers/cookies when calling getToken
    headers: Object.fromEntries(headerEntries),
    cookies: Object.fromEntries(cookieEntries),
  } as NextApiRequest;

  return await getToken({ req, secret: process.env.AUTH_SECRET });
}
