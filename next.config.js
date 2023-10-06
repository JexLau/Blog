const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  // blog
  // basePath: '/',
  i18n: {
    // 西班牙语：ES
    // 日语：JA
    // 韩语：KO
    // 德语: DE
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  },
  images: {
    unoptimized: true,
  },
})
