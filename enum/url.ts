// export const SSRHeader: HeadersInit = new Headers();
// SSRHeader.set('Content-Type', 'application/json');
// SSRHeader.set("Accept-Language", "en-US");
// SSRHeader.set("currency", "IRR");
// SSRHeader.set("apikey", process.env.PROJECT_SERVER_APIKEY!);
// SSRHeader.set("tenantid", '6');


export const Header = {
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "apikey": process.env.PROJECT_SERVER_APIKEY,
    // "tenantid": process.env.PROJECT_SERVER_TENANTID,
  };
  //to do: static header parameters!

  export const ServerAddress = {
    Type: process.env.PROJECT_SERVER_TYPE,
    // User: process.env.PROJECT_SERVER_USER,
    Hotel_WP: process.env.PROJECT_SERVER_HOTEL_WP,
    Hotel_Main: process.env.PROJECT_SERVER_HOTEL_MAIN,
    Hotel_Data: process.env.PROJECT_SERVER_HOTEL_DATA,
    Hotel_Availability: process.env.PROJECT_SERVER_HOTEL_AVAILABILITY,
    Coordinator: process.env.PROJECT_SERVER_COORDINATOR,
    Blog: process.env.PROJECT_SERVER_BLOG,
    Payment: process.env.PROJECT_SERVER_PAYMENT,
    Flight: process.env.PROJECT_SERVER_FLIGHT,
    Crm:process.env.PROJECT_SERVER_CRM
  };

  export const User = {
  };

  export const Flight = {
  };

  export const Blog = {
    getPosts: "//wp-json/wp/v2/posts",
    getTagPost: '/wp-json/wp/v2/posts?tags=',

    getCategoriesBlog: '/wp-json/wp/v2/posts?categories=',
    
    getCategories1: '/wp-json/wp/v2/best_category?categories=2',
    getCategories2: '/wp-json/wp/v2/best_category?categories=3',
    
    getCategoeyName: '/wp-json/wp/v2/categories',
    
    
    
    getCities: "//wp-json/wp/v2/cities/",
    getTagName: '/wp-json/wp/v2/tags/',
    getSearchPost: '/wp-json/wp/v2/posts?search='
  }

  export const Hotel = {
    GetLocation: "/api/services/app/BookingHotel/GetLocation",
    GetEntity:"/api/services/app/Entity/Search",
    GetHotelById: "/v2/Hotel/GetHotelById",
    GetHotelByUrl: "/v2/Hotel/GetHotelByUrl",
    GetScore: "/v2/Comment/GetScore",
    GetAccommodationData :"/api/services/app/Accommodation/Get",
    GetPageByUrl: "/v2/Page/GetPageByUrl",
    GetPortal: "/v2/Portal/GetPortal",
    InsertComment : '/v2/Comment/InsertComment',
    AvailabilityByHotelId:"/api/services/app/Booking/AvailabilityByHotelId",
    GetRooms:"/api/services/app/Booking/GetRoom",
    GetDomesticHotelDetails:"/api/services/app/Accommodation/Get",
    ValidateRoom:"/api/services/app/Booking/Validate",
    SearchHotels:"/v2/Hotel/SearchHotels",
    getRates:"/v2/Comment/Rates",
    getCityFaqById:"/api/services/app/Faq/GetAll",
    GetEntityNameByLocation: "/v2/Entity/GetEntityNameByLocation",
    GetValidate:"/api/services/app/Booking/GetValidate",
    PreReserve: "/api/services/app/Booking/PreReserve",
    GetReserveById: "/api/services/app/Reserve/Get"
  };

  export const Reserve = {
     GetReserveFromCoordinator : "/api/services/app/Order/Get"
  };

  export const Payment = {
    ValidateDiscountCode:"/api/services/app/Discount/Validate",
    RegisterDiscountCode: "/api/services/app/Discount/Register",
    GetBankGateway:"/api/services/app/ReserveBankGateway/GetAll",
    MakeToken:"/api/services/app/ReserveBankGateway/MakeToken"
  };
  
  export const ServerStatus = {
    Success: 1,
    Error: 2,
    SummaryError: 3,
  };

  
