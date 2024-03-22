import express from "express";
import routes from "./routes/index";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

export default app;
