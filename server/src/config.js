import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,
};

if (!config.jwtSecret) {
  throw new Error(
    "JWT_SECRET IS MISSING - COPY .env.example TO .env AND SET IT",
  );
}

if (!config.mongoUri) {
  throw new Error(
    "MONGODB_URI IS MISSING - COPY .env.example TO .env AND SET IT",
  );
}
