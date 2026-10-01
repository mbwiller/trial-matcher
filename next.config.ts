import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The registry snapshot and its harvest manifest are read from disk at
  // runtime (lib/demo/trials.ts, lib/demo/harvest.ts), so the file tracer has
  // to be told to ship them with the route handlers that use them.
  outputFileTracingIncludes: {
    "/api/*": ["./lib/demo/trials.json", "./lib/demo/harvest.json"],
  },
};

export default nextConfig;
