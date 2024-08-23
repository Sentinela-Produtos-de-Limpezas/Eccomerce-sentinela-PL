import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://sentinelapl.com.br",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;
