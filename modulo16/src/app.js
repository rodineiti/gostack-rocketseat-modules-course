import "dotenv/config";

import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";
import RateLimit from "express-rate-limit";
import RateLimitRedis from "rate-limit-redis";
import Youch from "youch";
import * as Sentry from "@sentry/node";
import "express-async-errors";
import routes from "./routes";
import sentryConfig from "./config/sentry";
import redisConfig from "./config/redis";
import "./database";

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "temp", "uploads"))
    );

    if (process.env.NODE_ENV !== "development") {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient(redisConfig),
          }),
          windowMs: 1000 * 60 * 15, // maximo de 15 minutos de intervalo,
          max: 100, // maximo de 100 requisições no intervalo de 15 minutos
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, request).toJSON();

        return response.status(500).json(errors);
      }

      return response.status(500).json({ error: "Internal server error" });
    });
  }
}

export default new App().server;
