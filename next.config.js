const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  },
});
