import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ error: "Invalid login" });
    return;
  }

  const isUser = await comparePasswords(req.body.password, user.password);

  if (isUser) {
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
  } else {
    res.status(401);
    res.json({ error: "Invalid login" });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(402);
  res.end();
}
