import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* dev-only: lets phones on the LAN reach dev resources (HMR); no effect in prod */
  allowedDevOrigins: ["192.168.1.139"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
