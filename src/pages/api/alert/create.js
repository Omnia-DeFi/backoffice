import { prisma } from "../../../prisma/prisma";

export default async function handler(req, res) {
  const { title, content, type, read } = req.body;

  try {
    const createdAlert = await prisma.alert
      .create({
        data: {
          title,
          content,
          type,
          date: new Date(),
          read,
        },
      })
      .catch(console.error)
      .finally(() => prisma.$disconnect());
    res.status(200).json({ message: "Alert created", createdAlert });
  } catch (error) {
    console.log("Failure");
  }
}
