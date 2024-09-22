import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = ["http://localhost:5173"]
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins
}

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
