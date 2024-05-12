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

    const produtos = [
      "Limpa Tudo",
      "Sabão de Lavar Louça",
      "Detergente para Roupa",
      "Limpa Piso",
      "Limpa Vidros",
      "Desinfetante para Banheiro",
      "Limpa Forno",
      "Spray Desinfetante",
      "Esponja",
      "Escova de Limpeza",
      "Mop",
      "Sacos de Lixo",
    ];


    for (const produtoNome of produtos) {
      const placeholderImageBase = "https://via.placeholder.com/150"; // URL base para imagem placeholder

      await tx.product.create({
        data: {
          name: produtoNome,
          price: Math.random() * 10 + 5, // Preço aleatório entre R$5 e R$15
          image: placeholderImageBase,
          sku: `${produtoNome.replace(/\s/g, "")}123`, // Gera SKU baseado no nome do produto
          categories: {
            create: {
              category: {
                connect: { id: category1.id },
              },
            },
          },
        },
      });
    }
  })
}

seed()
  .catch((e) => {
    console.error("Seeding failed!", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
