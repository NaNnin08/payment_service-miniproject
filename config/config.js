const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3030,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  db_name: "payment-service",
  db_username: "postgres",
  db_password: "admin",
};

export default config;
