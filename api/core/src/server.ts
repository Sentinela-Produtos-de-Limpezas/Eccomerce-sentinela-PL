import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const options: cors.CorsOptions = {
  credentials: true,
  origin: ["http://localhost:5173",
    "http://bohr.com",
    "https://bohr.com",
    "http://sentinelapl.com.br",
    "https://sentinelapl.com.br"
  ],
};

app.use(cookieParser());
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;
