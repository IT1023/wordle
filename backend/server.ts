import express from "express";
import cors from "cors";
import "./config/dotenv.ts";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("App is listening on : " + PORT);
});
