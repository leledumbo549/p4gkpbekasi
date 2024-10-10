import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // todo
  async function create(username, pass, role) {
    const password = await bcrypt.hash(pass, 10);
    await prisma.user.upsert({
      where: { username },
      update: {
        password
      },
      create: {
        username,
        password
      },
    })
  }

  await create('admin', 'gkpbekasijaya24', 'admin');
  await create('viewer', 'gkpbksmaju2024', 'viewer');

  const p = await prisma.pengaturan.findFirst();
  if (!p) await prisma.pengaturan.create({ data: {} });
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