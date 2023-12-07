/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.safaraneh.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.safaraneh.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'panel.safaraneh.com',
        port: '',
        pathname: '**',
      },
    ]
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env: {
    PROJECT: "SAFARANEH",
    THEME: "THEME1",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",
    PROJECT_SERVER_PAYMENT: "",
    PROJECT_SERVER_LOCALSERVER: "",
    PROJECT_SERVER_APIKEY: "b4fa99cc-3dfd-40a5-8bcf-53acdc2dbd84",
    PROJECT_SERVER_HOTEL_MAIN: "api.safaraneh.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.safaraneh.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv4.safaraneh.com",
    PROJECT_SERVER_BLOG :"panel.safaraneh.com",
    PROJECT_SERVER_FLIGHT: "",
    PROJECT_SERVER_PACKAGE: "",
    PROJECT_SERVER_TENANTID: "",
    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    PROJECT_SERVER_GA_ID: ""
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig
