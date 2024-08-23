import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configuração das opções de CORS
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://devfrontend.bohr.io",
      "https://sentinelapl.com.br",
    ];

    // Verifica se a origem da requisição está na lista de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // Cabeçalhos permitidos
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Custom-Header"
  ],
  // Métodos permitidos
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

// Middleware para CORS
app.use(cors(corsOptions));

// Middleware para parsing de cookies
app.use(cookieParser());

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de URLs codificadas
app.use(express.urlencoded({ extended: true }));

// Definindo as rotas
app.use(routes);

// Iniciando o servidor
if (!module.parent) {
  app.listen(3000, () => {
    console.log("Express started on port 3000");
  });
}

export default app;
