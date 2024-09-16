import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // todo
  async function create(username, pass, role) {
    const password = await bcrypt.hash(pass, 10);
    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        password
      },
    })
  }

  await create('admin', '123123', 'admin');
  await create('viewer', '123123', 'viewer');
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })