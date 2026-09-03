import { config } from "./config.js";
import { connectDb } from "./db/connect.js";
import app from "./app.js";

try {
  await connectDb();
  app.listen(config.port, () =>
    console.log(`API LISTENING ON http://localhost:${config.port}`),
  );
} catch (err) {
  console.error("FAILED TO START - COULD NOT CONNECT TO MongoDB:", err.message);
  process.exit(1);
}
