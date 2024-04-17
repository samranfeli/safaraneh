import axios from "axios";

function creareSiteMap(hotelsData:any,postsData:any, domesticFlightsData:any){
  let latestPost = 0;
  let projectsXML = "";
  let hotelXML = "";
  let domesticFlightXML = "";
  
  if(hotelsData){
    for(let i = 0 ; i <hotelsData.length ; i++ ){
      const hotel = hotelsData[i];
      const hotelURL = `${process.env.SITE_NAME}${hotel.Url}/`;
      hotelXML += `
        <url>
          <loc>${hotelURL}</loc>
          <lastmod>${hotel.LastModifyDate.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    }
  }

  if(domesticFlightsData){
    for (let i = 0; i < domesticFlightsData.length; i++) {
      const flight = domesticFlightsData[i];

      const domesticFlightURL = `${process.env.SITE_NAME}/fa/flights/${flight.slug}/`;
      domesticFlightXML += `
        <url>
          <loc>${domesticFlightURL}</loc>
          <lastmod>${flight.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    }
  }

  if(postsData){
    for (let i = 0; i < postsData.length; i++) {
      const post = postsData[i];

      const postDate = Date.parse(post.modified);
      if (!latestPost || postDate > latestPost) {
        latestPost = postDate;
      }

      const projectURL = `${process.env.SITE_NAME}/fa/blog/${post.slug}/`;
      projectsXML += `
        <url>
          <loc>${projectURL}</loc>
          <lastmod>${post.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.7</priority>
        </url>`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.SITE_NAME}/fa/</loc>
        <lastmod>2021-02-03</lastmod>
        <priority>1.0</priority>
      </url>
      ${projectsXML}
      ${hotelXML}
      ${domesticFlightXML}
    </urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res }:{res:any}) => {


  const [postsResponse, hotelsResponse, flightResponse] = await Promise.all([
    axios.get(`${process.env.PROJECT_SERVER_BLOG}wp-json/wp/v2/posts?per_page=100`).catch(function (error) {
      console.log(error.toJSON());
    })
    ,
    axios.post(
      "https://api.safaraneh.com/v2/Page/GetPages",
      { "LanguageIds": [1], "LayoutIds": [21, 48] },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          apikey: process.env.PROJECT_PORTAL_APIKEY,
        },
      }).catch(function (error) {
        console.log(error.toJSON());
      })
    ,
    axios.get(`${process.env.PROJECT_SERVER_BLOG}wp-json/wp/v2/flightdomestic`).catch(function (error) {
      console.log(error.toJSON());
    })
  ]);

  const sitemap = creareSiteMap(hotelsResponse?.data , postsResponse?.data, flightResponse?.data );

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;