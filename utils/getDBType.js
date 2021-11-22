const { PrismaClient } = require("@prisma/client");

const getDBType = () => {
  if (process.env.NODE_ENV === "test") {
    const prisma = new PrismaClient({
      datasources: { db: { url: process.env.TEST_DATABASE_URL } },
    });
    return prisma;
  } else {
    const prisma = new PrismaClient();
    return prisma;
  }
};

module.exports = getDBType;
