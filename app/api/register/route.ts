import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstName, lastName } = req.body;
  const user = await db.user.create({
    data: {
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
    },
  });

  const jwt = await createJWT(user);
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME!, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );
  res.status(201);
  res.end();
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(402);
  res.end();
}
