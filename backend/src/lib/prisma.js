require("dotenv").config()


const {PrismaClient} = require("../../generated/prisma")
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");


//Recebe o a query do Prisma e o better sqlite 3 abre o banco e roda com c++ em alta velocidade
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

module.exports = prisma;