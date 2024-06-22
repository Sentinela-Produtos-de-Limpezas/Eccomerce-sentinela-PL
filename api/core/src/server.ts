import express from "express";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false
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
