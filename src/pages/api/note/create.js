import { prisma } from "../../../prisma/prisma";

export default async function handler(req, res) {
  const { issuer, email } = req.body;

  try {
    await prisma.user.create({
      data: {
        issuer,
        email,
      },
    });
    res.status(200).json({ message: "Note Created" });
  } catch (error) {
    console.log("Failure");
  }
}