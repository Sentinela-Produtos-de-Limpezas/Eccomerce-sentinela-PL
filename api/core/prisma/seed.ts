import prisma from '../src/model/prisma';
import { hashPassword } from '../src/helpers/saltPassword';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { userInput } from '../src/types/user/user';
import { productInput } from '../src/types/products/product';


async function seed() {

  const Categories = [
    { name: "Eletrônicos", description: "Aparelhos eletrônicos" },
    { name: "Roupas", description: "Itens de vestuário" },
    { name: "Livros", description: "Literatura e leitura" },
  ]

  const Users: userInput[] = [
    {
      name: "Lucas",
      lastname: "Bispo Menezes",
      email: "teste@teste.com",
      password: hashPassword("teste123456"),
      phone: faker.phone.number(),
      cpforcnpj: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
    },
    {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashPassword(faker.internet.password()),
      phone: faker.phone.number(),
      cpforcnpj: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
    },
    {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashPassword(faker.internet.password()),
      phone: faker.phone.number(),
      cpforcnpj: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
    },
    {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashPassword(faker.internet.password()),
      phone: faker.phone.number(),
      cpforcnpj: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
    }
  ]

  const produtos: productInput[] = [
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    },
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: `https://picsum.photos/seed/phone/500/700`,
      sku: faker.commerce.isbn()
    }
  ]


  await prisma.$transaction(async (tx) => {


    for (const category of Categories) {
      await tx.category.create({
        data: {
          name: category.name,
          description: category.description,
        }
      })
    }

    for (const user of Users) {
      await tx.user.create({
        data: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          phone: user.phone,
          cpforcnpj: user.cpforcnpj,
          address: {
            create: {
              Street: faker.location.street(),
              Number: faker.location.buildingNumber(),
              City: faker.location.city(),
              isMain: true,
            }
          }
        },
      })
    }

    for (const produto of produtos) {
      await tx.product.create({
        data: {
          name: produto.name,
          price: produto.price,
          image: produto.image,
          sku: produto.sku,
          categories: {
            create: [
              {
                category: {
                  connect: {
                    id: [1, 2, 3.4][Math.floor(Math.random() * 3)],

                  }
                }
              }
            ]
          }
        }
      })
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