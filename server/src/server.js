import { config } from "./config.js";
import app from "./app.js";

app.listen(config.port, () =>
  console.log(`API LISTENING ON http://localhost:${config.port}`),
);
