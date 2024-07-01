const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  ...nextTranslate()
};

module.exports = nextConfig;
