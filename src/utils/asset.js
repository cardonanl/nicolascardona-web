// Prepends Vite's base URL to a public asset path.
// In dev: BASE_URL = '/' → '/images/foo.png'
// In prod: BASE_URL = '/nicolascardona-web/' → '/nicolascardona-web/images/foo.png'
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
