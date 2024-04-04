import { jwtService } from "./jwt";
import prisma from "./prisma/prisma";
import { getVerificationTokenByEmail } from "./query";

type Payload = {
  email: string;
  name: string;
};
export const generateVerificationToken = async (payload: Payload) => {
  const token = await jwtService.sign(payload, "5m");
  try {
    const existingToken = await getVerificationTokenByEmail(payload.email);
    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    return await prisma.verificationToken.create({
      data: {
        email: payload.email,
        token,
      },
    });
  } catch (error) {
    console.log("error from token -- ", error);
  }
};
