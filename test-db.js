const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log('Testing connection...');
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('Connected successfully:', result);
  } catch (err) {
    console.error('Error connecting:', err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
