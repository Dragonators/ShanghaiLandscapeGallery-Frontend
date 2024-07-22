export const oidcSettings = {
  authority: 'https://localhost:7001',
  clientId: 'vue-client',
  redirectUri: 'https://localhost:9001/oidc-callback',
  responseType: 'code',
  scope: 'openid profile gallery_api'
}
