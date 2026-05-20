import express from "express";
import cors from "cors";
import "./config/dotenv.ts";
import game from "./routes/game.route.ts";
import postWord from "./routes/postWord.route.ts";
import reset from "./routes/reset.route.ts";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/game", game);

app.use("/word", postWord);

app.use("/reset-game", reset);

app.listen(PORT, () => {
  console.log("App is listening on : " + PORT);
});
