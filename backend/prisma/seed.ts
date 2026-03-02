import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin12345', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', fullName: 'Admin', passwordHash, badge: 'admin' },
  });

  await prisma.privacySetting.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      lastSeen: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      profilePhoto: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      bio: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      searchByUsername: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
    },
  });

  await prisma.notification.create({ data: { title: 'Добро пожаловать', message: 'Backend запущен и готов к работе', icon: 'info' } });
}

main().finally(() => prisma.$disconnect());
