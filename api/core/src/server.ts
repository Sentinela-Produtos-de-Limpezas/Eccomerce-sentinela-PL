import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configuração das opções de CORS

const allowedDomains = [
  "http://localhost:5173",
  "https://devfrontend.bohr.io",
  "https://sentinelapl.com.br",
]
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin:  function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}

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
