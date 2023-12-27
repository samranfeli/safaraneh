const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'fa',
    localePath: path.resolve('./public/locales'),
    localeDetection: false
  },
}