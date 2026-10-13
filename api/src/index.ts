import express from "express";
import cors from "cors";
import { config } from "./config";
import { requireAuth } from "./auth";
import { extractRouter } from "./routes/extract";
import { clarifyRouter } from "./routes/clarify";

const app = express();
app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, models: config.geminiModels, ai: Boolean(config.geminiApiKey) });
});

app.use(requireAuth);
app.use("/extract", extractRouter);
app.use("/clarify", clarifyRouter);

app.listen(config.port, () => {
  console.log(`[api] listening on :${config.port}`);
});
