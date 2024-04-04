export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    return;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    return;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await prisma.verificationToken.findUnique({
      where: { token },
    });
  } catch (error) {
    return;
  }
};
