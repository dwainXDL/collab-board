import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET IS MISSING - COPY .env.example TO .env AND SET IT");
}
