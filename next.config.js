/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env:{
    PROJECT:"NAMINTRAVEL",
    THEME : "ITOURS_IR",
    //THEME : "STYLE_2",
    //THEME : "NAMINTRAVELCOM"
    PROJECT_SERVER_TYPE : "https://",
    PROJECT_SERVER_USER : "cidentity.itours.ir",
    PROJECT_SERVER_PAYMENT : "payline2.itours.ir",
    PROJECT_SERVER_LOCALSERVER : "itours.ir",
    PROJECT_SERVER_APIKEY : "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
    PROJECT_SERVER_HOTEL : "hotel.itours.no",
    PROJECT_SERVER_FLIGHT : "flight.itours.ir",
    PROJECT_SERVER_PACKAGE : "packages.itours.no",
    PROJECT_SERVER_TENANTID : "6",
    PROJECT_SERVER_NATIONALITY : "IR",
    PORT : '4200',
    PROJECT_SERVER_GA_ID :"UA-215089365-2"
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]
    
  }
}

module.exports = nextConfig
