import bcrypt from "bcrypt";

/* ================= HASH PASSWORD ================= */
export const hashPassword = async (
  password
) => {
  const saltRounds = Number(
    process.env.BCRYPT_SALT_ROUNDS
  ) || 10;

  return bcrypt.hash(
    password,
    saltRounds
  );
};

/* ================= COMPARE PASSWORD ================= */
export const comparePassword = async (
  password,
  hashedPassword
) => {
  return bcrypt.compare(
    password,
    hashedPassword
  );
};