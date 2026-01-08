import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...');

  // Create 10 Users with Balance
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.upsert({
      where: { number: `111111111${i}` },
      update: {},
      create: {
        number: `111111111${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash(`user${i}password`, 10),
        name: `User ${i}`,
        Balance: {
          create: {
            amount: 10000 + (i * 1000),
            locked: i * 100,
          }
        },
      },
    });
    users.push(user);
  }
  console.log(`Created ${users.length} users`);

  // Create 10 Merchants with MerchantBalance
  const merchants = [];
  for (let i = 1; i <= 10; i++) {
    const merchant = await prisma.merchant.upsert({
      where: { email: `merchant${i}@business.com` },
      update: {},
      create: {
        email: `merchant${i}@business.com`,
        name: `Merchant Business ${i}`,
        password: await bcrypt.hash(`merchant${i}password`, 10),
        phoneNumber: `999999999${i}`,
        businessType: ['Retail', 'Food', 'Electronics', 'Clothing', 'Services'][i % 5],
        businessAddress: `${i} Business Street, City ${i}`,
        profilePicture: `https://avatar.iran.liara.run/public/merchant${i}`,
        merchantBalance: {
          create: {
            amount: 50000 + (i * 5000),
            locked: i * 500,
          }
        },
      },
    });
    merchants.push(merchant);
  }
  console.log(`Created ${merchants.length} merchants`);

  // Create 10 OnRampTransactions for Users
  const onRampTransactions = [];
  const providers = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI', 'Kotak Bank'];
  const statuses: ('Success' | 'Failure' | 'Processing')[] = ['Success', 'Failure', 'Processing'];
  
  for (let i = 1; i <= 10; i++) {
    const transaction = await prisma.onRampTransaction.create({
      data: {
        token: `token_user_${i}_${Date.now()}`,
        provider: providers[i % providers.length]!,
        amount: 5000 + (i * 500),
        startTime: new Date(Date.now() - i * 86400000), // i days ago
        status: statuses[i % statuses.length]!,
        userId: users[i - 1]!.id,
      },
    });
    onRampTransactions.push(transaction);
  }
  console.log(`Created ${onRampTransactions.length} OnRamp transactions for users`);

  // Create 10 OnRampTransactions for Merchants
  for (let i = 1; i <= 10; i++) {
    await prisma.onRampTransaction.create({
      data: {
        token: `token_merchant_${i}_${Date.now()}`,
        provider: providers[i % providers.length]!,
        amount: 10000 + (i * 1000),
        startTime: new Date(Date.now() - i * 43200000), // i half-days ago
        status: statuses[i % statuses.length]!,
        merchantId: merchants[i - 1]!.id,
      },
    });
  }
  console.log('Created 10 OnRamp transactions for merchants');

  // Create 10 P2P Transfers (User to User)
  const p2pTransfers = [];
  for (let i = 1; i <= 5; i++) {
    const transfer = await prisma.p2pTransfer.create({
      data: {
        amount: 500 + (i * 100),
        timestamp: new Date(Date.now() - i * 3600000), // i hours ago
        fromUserId: users[i - 1]!.id,
        toUserId: users[i % 10]!.id,
      },
    });
    p2pTransfers.push(transfer);
  }

  // Create 5 P2P Transfers (User to Merchant)
  for (let i = 1; i <= 5; i++) {
    const transfer = await prisma.p2pTransfer.create({
      data: {
        amount: 1000 + (i * 200),
        timestamp: new Date(Date.now() - i * 7200000), // i*2 hours ago
        fromUserId: users[i + 4]!.id,
        toMerchantId: merchants[i - 1]!.id,
      },
    });
    p2pTransfers.push(transfer);
  }
  console.log(`Created ${p2pTransfers.length} P2P transfers`);

  // Create 1 ScheduledTasksdt entry for daily task
  const task = await prisma.scheduledTasksdt.upsert({
    where: { taskName: 'daily-scheduled-transfer-execution' },
    update: {},
    create: {
      taskName: 'daily-scheduled-transfer-execution',
      cronExpression: '0 0 * * *', // Daily at midnight
      isActive: true,
      lastRun: new Date(Date.now() - 86400000), // 1 day ago
    },
  });
  console.log('Created 1 scheduled task');

  console.log('Database seeding completed successfully!');
  console.log({
    users: users.length,
    merchants: merchants.length,
    onRampTransactions: onRampTransactions.length + 10,
    p2pTransfers: p2pTransfers.length,
    scheduledTask: 1,
  });
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