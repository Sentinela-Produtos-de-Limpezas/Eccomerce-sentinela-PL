// types/order/order.ts

// Tipo para os produtos no pedido
export interface ProductOnOrderInput {
  productId: number; // ID do produto
  quantity: number;  // Quantidade do produto no pedido
}

// Tipo para a entrada de dados ao criar um pedido
export interface OrderInput {
  total: number;                // Total do pedido
  status: string;               // Status do pedido (ex: 'pending', 'completed')
  userId: number;              // ID do usuário que fez o pedido
  couponId?: number | null;     // ID do cupom, se aplicável
  products: ProductOnOrderInput[]; // Produtos associados ao pedido
}

// Tipo para a atualização de dados de um pedido
export interface OrderUpdate {
  total?: number;                // Total do pedido (opcional)
  status?: string;               // Status do pedido (opcional)
  couponId?: number | null;      // ID do cupom, se aplicável (opcional)
}

// Tipo para o pedido completo que pode ser retornado
export interface Order {
  id: number;                   // ID do pedido
  total: number;                // Total do pedido
  status: string;               // Status do pedido
  userId: number;              // ID do usuário
  couponId?: number | null;     // ID do cupom, se aplicável
  products: ProductOnOrder[];   // Produtos associados ao pedido
}

// Tipo para a relação entre produtos e pedidos
export interface ProductOnOrder {
  id: number;                   // ID da relação
  quantity: number;             // Quantidade do produto no pedido
  productId: number;           // ID do produto
  orderId: number;             // ID do pedido
  product: {                    // Detalhes do produto
    id: number;                 // ID do produto
    name: string;               // Nome do produto
    price: number;              // Preço do produto
    image: string;              // Imagem do produto
    sku: string;                // SKU do produto
  };
}
