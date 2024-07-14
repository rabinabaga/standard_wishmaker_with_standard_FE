const corsConfig = {
  origin: [
    "http://0.0.0.0:5173",
    "http://localhost:5173",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://pokharauae.com",
    "https://pokharauae.com",
    "http://panel.pokharauae.com",
    "https://panel.pokharauae.com",
    "https://api.pokharauae.com",
    "http://api.pokharauae.com",
  ],
  optionsSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-ADMIN-TOKEN",
    "X-SESSION",
  ],
  credentials: true,
  preflightContinue: true,
};

export default corsConfig;
