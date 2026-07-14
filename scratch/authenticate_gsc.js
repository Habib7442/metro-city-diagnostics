const { authenticateWithOAuth } = require('C:/Users/Hbib/AppData/Roaming/npm/node_modules/suganthan-gsc-mcp/dist/oauth');

process.env.GSC_AUTH_MODE = "oauth";
process.env.GSC_OAUTH_SECRETS_FILE = "E:/tokens/gsc-oauth-secrets.json";
process.env.GSC_SITE_URL = "sc-domain:metrocitydiagnostics.com";

console.log("Starting Google Search Console OAuth authentication...");
authenticateWithOAuth()
  .then(() => {
    console.log("SUCCESS: Authentication successful! Token saved to C:/Users/Hbib/.gsc-mcp/oauth-token.json");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR: Authentication failed:", err);
    process.exit(1);
  });
