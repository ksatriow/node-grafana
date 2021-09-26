import express from "express";
import { collectDefaultMetrics, register } from "prom-client";

collectDefaultMetrics();

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.get("/", (_req, res) => {
  res.end("Test Monitor Node using Grafana");
});

app.get("/metrics", async (_req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

try {
  app.listen(port, hostname, () => {
    console.log(`Node app run at http://${hostname}:${port}`);
  });
} catch (error) {
  console.error("Failed run node app", error);
}
