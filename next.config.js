/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env:{
    PROJECT:"SAFARANEH",
    THEME : "THEME1",
    PROJECT_SERVER_TYPE : "https://",
    PROJECT_SERVER_USER : "",
    PROJECT_SERVER_PAYMENT : "",
    PROJECT_SERVER_LOCALSERVER : "",
    PROJECT_SERVER_APIKEY : "",
    PROJECT_SERVER_HOTEL : "",
    PROJECT_SERVER_FLIGHT : "",
    PROJECT_SERVER_PACKAGE : "",
    PROJECT_SERVER_TENANTID : "",
    PROJECT_SERVER_NATIONALITY : "",
    PORT : '',
    PROJECT_SERVER_GA_ID :""
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]
    
  }
}

module.exports = nextConfig
