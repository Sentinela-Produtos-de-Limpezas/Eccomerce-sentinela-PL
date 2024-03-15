import express, { Response, Request } from "express";

const app = express();

const users = [
  { id: 1, name: "Lucas" },
  { id: 2, name: "Eric" },
  { id: 3, name: "Ana" },
];


app.get("/", function (req: Request, res: Response) {
  res.send(`
  Oi! Essa é a API do sistema Eccomerce da sentinela
  Mas o que é uma API?

Imagine que você está em um restaurante e deseja fazer um pedido. Você não entra na cozinha e mexe nas panelas, certo? Você pede ao garçom, que anota seu pedido e o leva para a cozinha. A API é como o garçom: ela recebe sua solicitação e a envia para a parte interna do sistema, que é o backend.

E o que é o backend?

O backend é como a cozinha do restaurante. É onde a "mágica" acontece, processando sua solicitação e preparando a resposta. No caso do Eccomerce da sentinela, o backend é responsável por:

- Armazenar e gerenciar seus dados
- Realizar cálculos e processamentos
- Controlar o acesso ao sistema
- Garantir a segurança das informações
Em resumo:

A API é a porta de entrada para o Eccomerce da sentinela.
O backend é o "motor" que faz o sistema funcionar.
  `);
});

app.get("/users", function (req: Request, res: Response) {
  res.send(users);
});

app.get("/users/:userId", function (req: Request, res: Response) {
  const user = users.find((user) => user.id === parseInt(req.params.userId));
  res.send(user);
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;