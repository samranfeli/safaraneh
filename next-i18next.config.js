const path = require('path')

module.exports = {
  i18n: {
    locales: ['default','en', 'fa'],
    defaultLocale: 'default',
    localePath: path.resolve('./public/locales'),
    localeDetection: false
  },
}