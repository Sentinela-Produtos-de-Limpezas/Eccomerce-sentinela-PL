import prisma from '../src/model/prisma';
import { hashPassword } from '../src/helpers/saltPassword';
import { userInput } from '../src/types/user/user';
import { productInput } from '../src/types/products/product';

async function seed() {
  const Categories = [
    { id: 1, name: "Detergentes", description: "Produtos para limpeza de utensílios e superfícies" },
    { id: 2, name: "Desinfetantes", description: "Produtos para desinfecção de ambientes" },
    { id: 3, name: "Sabões e Sabonetes", description: "Sabões para roupas e sabonetes para uso pessoal" },
    { id: 4, name: "Limpadores Multiuso", description: "Produtos para limpeza geral de superfícies" }
  ];

  const Users: userInput[] = [
    {
      name: "Lucas",
      lastname: "Bispo Menezes",
      email: "teste@teste.com",
      password: hashPassword("teste123456"),
      phone: "71999998888",
      cpforcnpj: "12345678901"
    }
  ];

  const produtos: productInput[] = [
    // Detergentes
    { name: "Detergente Líquido Neutro", price: 5.99, image: "https://picsum.photos/seed/detergente/500/700", sku: "DET-001", categoryId: 1 },
    { name: "Detergente Líquido Limão", price: 6.49, image: "https://picsum.photos/seed/detergentelimao/500/700", sku: "DET-002", categoryId: 1 },
    { name: "Detergente Lava-Louças", price: 6.99, image: "https://picsum.photos/seed/detergentelavaloucas/500/700", sku: "DET-003", categoryId: 1 },
    { name: "Detergente Gel Concentrado", price: 7.99, image: "https://picsum.photos/seed/detergentegel/500/700", sku: "DET-004", categoryId: 1 },
    
    // Desinfetantes
    { name: "Desinfetante Lavanda", price: 8.99, image: "https://picsum.photos/seed/desinfetantelavanda/500/700", sku: "DES-001", categoryId: 2 },
    { name: "Desinfetante Pinho", price: 7.99, image: "https://picsum.photos/seed/desinfetantepinho/500/700", sku: "DES-002", categoryId: 2 },
    { name: "Desinfetante Eucalipto", price: 8.49, image: "https://picsum.photos/seed/desinfetanteeucalipto/500/700", sku: "DES-003", categoryId: 2 },
    { name: "Desinfetante Citrus", price: 8.49, image: "https://picsum.photos/seed/desinfetantecitrus/500/700", sku: "DES-004", categoryId: 2 },
    { name: "Desinfetante Marinho", price: 8.99, image: "https://picsum.photos/seed/desinfetantemarinho/500/700", sku: "DES-005", categoryId: 2 },
    
    // Sabões e Sabonetes
    { name: "Sabão em Pó 1kg", price: 10.99, image: "https://picsum.photos/seed/sabaoempo/500/700", sku: "SAB-001", categoryId: 3 },
    { name: "Sabão Líquido Roupas", price: 12.99, image: "https://picsum.photos/seed/sabaoliquidoroupas/500/700", sku: "SAB-002", categoryId: 3 },
    { name: "Sabão Líquido Neutro", price: 11.99, image: "https://picsum.photos/seed/sabaoliquidoneutro/500/700", sku: "SAB-003", categoryId: 3 },
    { name: "Sabão em Barra Tradicional", price: 3.99, image: "https://picsum.photos/seed/sabaoembarra/500/700", sku: "SAB-004", categoryId: 3 },
    { name: "Sabonete Barra Neutro", price: 2.49, image: "https://picsum.photos/seed/sabonete/500/700", sku: "SAB-005", categoryId: 3 },
    { name: "Sabonete Líquido Lavanda", price: 3.49, image: "https://picsum.photos/seed/sabonetelavanda/500/700", sku: "SAB-006", categoryId: 3 },
    { name: "Sabonete Líquido Erva-Doce", price: 3.49, image: "https://picsum.photos/seed/saboneteervadoce/500/700", sku: "SAB-007", categoryId: 3 },
    
    // Limpadores Multiuso
    { name: "Limpador Multiuso Citrus", price: 9.99, image: "https://picsum.photos/seed/limpadorcitrus/500/700", sku: "LIM-001", categoryId: 4 },
    { name: "Limpador Multiuso Floral", price: 9.99, image: "https://picsum.photos/seed/limpadorfloral/500/700", sku: "LIM-002", categoryId: 4 },
    { name: "Limpador Multiuso Neutro", price: 10.99, image: "https://picsum.photos/seed/limpadorneutro/500/700", sku: "LIM-003", categoryId: 4 },
    { name: "Limpador Multiuso Perfumado", price: 9.49, image: "https://picsum.photos/seed/limpadorperfumado/500/700", sku: "LIM-004", categoryId: 4 }
  ];

  await prisma.$transaction(async (tx) => {
    for (const category of Categories) {
      await tx.category.create({
        data: {
          id: category.id,
          name: category.name,
          description: category.description
        }
      });
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
              Street: "Rua Exemplo",
              Number: "123",
              City: "Salvador",
              zipCode: "40000000",
              isMain: true
            }
          }
        }
      });
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
                    id: produto.categoryId 
                  }
                }
              }
            ]
          }
        }
      });
    }
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