import prisma from '../src/model/prisma';
import { hashPassword } from '../src/helpers/saltPassword';

async function seed() {
  // Wrap all data creation within a transaction
  await prisma.$transaction(async (tx) => {
    const user1 = await tx.user.create({
      data: {
        name: "John Doe",
        lastname: "Smith",
        email: "john.doe@example.com",
        password: hashPassword("hashed_password"), // Replace with a secure password hashing mechanism
        phone: "(123) 456-7890",
        cpforcnpj: "12345678900001",
        address: {
          create: {
            Street: "123 Main St",
            Number: "10",
            City: "Anytown",
            isMain: true,
          },
        },
      },
    });

    const user2 = await tx.user.create({
      data: {
        name: "Jane Smith",
        lastname: "Doe",
        email: "jane.smith@example.com",
        password: hashPassword("hashed_password"), // Replace with a secure password hashing mechanism
        phone: "(987) 654-3210",
        cpforcnpj: "98765432100002",
        address: {
          create: {
            Street: "456 Elm St",
            Number: "20",
            City: "Big City",
            isMain: true,
          },
        },
      },
    });

    const category1 = await tx.category.create({
      data: {
        name: "Electronics",
        description: "Electronic devices",
      },
    });

    const category2 = await tx.category.create({
      data: {
        name: "Clothing",
        description: "Clothing items",
      },
    });

    const product1 = await tx.product.create({
      data: {
        name: "Laptop",
        description: "A powerful laptop for work and play",
        price: 1299.99,
        image: "https://example.com/laptop.jpg",
        sku: "LAPTOP123",
        categories: {
          create: {
            category: {
              connect: { id: category1.id },
            },
          },
        },
      },
    });

    const product2 = await tx.product.create({
      data: {
        name: "T-Shirt",
        description: "A comfortable and stylish T-shirt",
        price: 24.99,
        image: "https://example.com/tshirt.jpg",
        sku: "TSHIRT100",
        categories: {
          create: {
            category: {
              connect: { id: category2.id },
            },
          },
        },
      },
    });

    const order1 = await tx.order.create({
      data: {
        total: 1324.98,
        status: "pending",
        user: { connect: { id: user1.id } },

        products: {
          create: [
            { quantity: 1, product: { connect: { id: product1.id } } },
          ],
        },
      },
    });

    const order2 = await tx.order.create({
      data: {
        total: 24.99,
        status: "completed",
        user: { connect: { id: user2.id } },
        products: {
          create: [
            { quantity: 1, product: { connect: { id: product2.id } } },
          ],
        },
      },
    })
    console.log(`Database seeded with example data using transactions.`);
  });
}

seed()
  .catch((e) => {
    console.error("Seeding failed!", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
