import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `\x1b[33mServer running on:\x1b[0m \x1b[36mhttp://localhost:${PORT}\x1b[0m`
  );
});