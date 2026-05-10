import express from "express";
import cors from "cors";
import "./config/dotenv.ts";
import game from "./routes/game.route.ts";
import postWord from "./routes/postWord.route.ts";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/game", game);

app.use("/word", postWord);

app.listen(PORT, () => {
  console.log("App is listening on : " + PORT);
});
