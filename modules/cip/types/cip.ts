export interface AirportDetailType {
  address: string;
  city: {
    name: string;
    code: string;
  }
  country: {
    name: string;
    code: string;
  }
  name: string;
  nameLong: string;
  url: string;
  picture: {
    path: string;
    altAttribute: string;
    titleAttribute: string;
  }
  id: number;
  description: string;
  Price: number,
  displayPrice: number;
}

export interface CipGetAirportByUrlResponseType {
  galleries: {
    path?: string;
    altAttribute?: string;
    titleAttribute?: string;
    id: number;
  }[];
  address?: string;
  name?: string;
  description?: string;
  facilities: {
    id: number;
    picture: {
      path?: string;
      altAttribute?: string;
      titleAttribute?: string;
    },
    description?: string;
    keyword?: string;
    name?: string;
  }[];
  latitude?: string;
  longitude?: string;
  code: string;
  // "url": "string",
  // "nameLong": "string",
  // "city": {
  //     "name": "string",
  //     "code": "string"
  // },
  // "country": {
  //     "name": "string",
  //     "code": "string"
  // },
  // "picture": {
  //     "path": "string",
  //     "altAttribute": "string",
  //     "titleAttribute": "string"
  // },
  // "id": 0
}

export interface CipFormPassengerItemType {
  id: string;
  gender: boolean;
  type: "Adult" | "Child";
  services: any[]
}

export interface CipFormCompanionItemType {
  id: string;
  services: any[]
}

export type CipPassengerType = "Adult" | "Child" | "Infant" | "Accompanying";

export interface CipAvailabilityItemType {
  id: number;
  name: string;
  passengerTypeServices: {
    passengerType: CipPassengerType,
    services: {
      name: string;
      id: number;
      boardPrice: number;
      salePrice: number;

      // "description": "string",
      // "hourDescription": "string",
      // "extraDescription": "string",
      // "title": "string",
      // "type": "Pet",
      // "priceType": "PerPassenger",
      // "netPrice": 0,
      // "currencyType": "USD",
      // "passengerType": "Adult",
      // "extraSalePrice": 0,
      // "extraNetPrice": 0,
      // "extraBoardPrice": 0,
      // "rateId": 0,
      // "hourSalePrice": 0,
      // "hourNetPrice": 0,
      // "hourBoardPrice": 0,
      // "picture": {
      //   "path": "string",
      //   "altAttribute": "string",
      //   "titleAttribute": "string"
      // },
      // "count": 0,
      // "extraCount": 0,
      // "hourCount": 0,
    }[]
  }[];

  services: {
    id: number;
    name: string;
    passengerType: "Adult" | "Child" | "Infant" | "Accompanying";
    description?: string;
    // "hourDescription": "string",
    // "extraDescription": "string",
    // "title": "string",
    // "type": "Pet",
    // "priceType": "PerPassenger",
    // "boardPrice": 0,
    // "netPrice": 0,
    salePrice: number;
    // "currencyType": "USD",
    // "extraSalePrice": 0,
    // "extraNetPrice": 0,
    // "extraBoardPrice": 0,
    // "rateId": 0,
    // "hourSalePrice": 0,
    // "hourNetPrice": 0,
    // "hourBoardPrice": 0,
    // "picture": {
    //   "path": "string",
    //   "altAttribute": "string",
    //   "titleAttribute": "string"
    // },
    // "count": 0,
    // "extraCount": 0,
    // "hourCount": 0,

  }[];
  // "adults": 0,
  // "children": 0,
  // "accompanying": 0,
  remark?: string;
  // "description": "string",
  // "netPrice": 0,
  boardPrice: number;
  salePrice: number;
  passengers: {
    passengerType: "Adult" | "Child" | "Infant" | "Accompanying";
    boardPrice: number;
    netPrice: number;
    salePrice: number;
    currencyType: "USD" | "IRR";
    id: number;
  }[];
  transport:
  {
    name?: string;
    salePrice: number;
    id: number;
    picture: {
      path?: string;
      altAttribute?: string;
      titleAttribute?: string;
    };
    description: string;
    // "boardPrice": 0,
    // "netPrice": 0,
    // "currencyType": "USD",
  }[];
}

export interface CipValidateResponseType {
  preReserveKey: string;
  "rate": {
    "adults": 0,
    "children": 0,
    "accompanying": 0,
    "name": "string",
    "remark": "string",
    "description": "string",
    "boardPrice": 0,
    "netPrice": 0,
    "salePrice": 0,
    "passengers": [
      {
        "passengerType": "Adult",
        "boardPrice": 0,
        "netPrice": 0,
        "salePrice": 0,
        "currencyType": "USD",
        "id": 0
      }
    ],
    "id": 0
  },
  "flightNumber": "string",
  "originName": "string",
  "airline": "string",
  "flightTime": "2024-03-12T06:01:35.791Z",
  "creationTime": "2024-03-12T06:01:35.791Z",
  "airport": {
    "name": "string",
    "nameLong": "string",
    "city": {
      "name": "string",
      "code": "string"
    },
    "country": {
      "name": "string",
      "code": "string"
    },
    "code": "string",
    "latitude": "string",
    "longitude": "string",
    "picture": {
      "path": "string",
      "altAttribute": "string",
      "titleAttribute": "string"
    },
    "id": 0
  },
  "services": [
    {
      "name": "string",
      "description": "string",
      "hourDescription": "string",
      "extraDescription": "string",
      "title": "string",
      "type": "Pet",
      "priceType": "PerPassenger",
      "boardPrice": 0,
      "netPrice": 0,
      "salePrice": 0,
      "currencyType": "USD",
      "passengerType": "Adult",
      "extraSalePrice": 0,
      "extraNetPrice": 0,
      "extraBoardPrice": 0,
      "rateId": 0,
      "hourSalePrice": 0,
      "hourNetPrice": 0,
      "hourBoardPrice": 0,
      "picture": {
        "path": "string",
        "altAttribute": "string",
        "titleAttribute": "string"
      },
      "count": 0,
      "extraCount": 0,
      "hourCount": 0,
      "id": 0
    }
  ],
  "passengerTypeServices": [
    {
      "passengerType": "Adult",
      "services": [
        {
          "name": "string",
          "description": "string",
          "hourDescription": "string",
          "extraDescription": "string",
          "title": "string",
          "type": "Pet",
          "priceType": "PerPassenger",
          "boardPrice": 0,
          "netPrice": 0,
          "salePrice": 0,
          "currencyType": "USD",
          "passengerType": "Adult",
          "extraSalePrice": 0,
          "extraNetPrice": 0,
          "extraBoardPrice": 0,
          "rateId": 0,
          "hourSalePrice": 0,
          "hourNetPrice": 0,
          "hourBoardPrice": 0,
          "picture": {
            "path": "string",
            "altAttribute": "string",
            "titleAttribute": "string"
          },
          "count": 0,
          "extraCount": 0,
          "hourCount": 0,
          "id": 0
        }
      ]
    }
  ],
  optionalServices: {
    name?: string;
    description?: string;
    type: "Pet" | "Passport" | "Wheelchair" | "Suite" | "Lunch" | "FlightCard" | "SpecialService" | "Parking" | "Conference" | "VipRoom" | "Visa" | "FastTrack" | "Transport" | "Lunch_Transport" | "FlightCard_Transport" | "MeetingRoom";
    salePrice: number;
    extraSalePrice?: number;
    hourSalePrice?: number;
    picture: {
      path?: string;
      altAttribute?: string;
      titleAttribute?: string;
    },
    count: number;
    extraCount?: number;
    hourCount?: number;
    id: number;
    // "hourDescription": "string",
    // "extraDescription": "string",
    // "title": "string",
    // "priceType": "PerPassenger",
    // "boardPrice": 0,
    // "netPrice": 0,
    // "currencyType": "USD",
    // "passengerType": "Adult",
    // "extraNetPrice": 0,
    // "extraBoardPrice": 0,
    // "rateId": 0,
    // "hourNetPrice": 0,
    // "hourBoardPrice": 0,
  }[];
  transport:
  {
    name?: string;
    salePrice: number;
    id: number;
    picture: {
      path?: string;
      altAttribute?: string;
      titleAttribute?: string;
    };
    // "description": "string",
    // "boardPrice": 0,
    // "netPrice": 0,
    // "currencyType": "USD",
  }[];

}

export interface CipPrereservePayload {

  airline: string;
  flightNumber: string;
  originName: string;
  destinationName: string;
  flightTime: string;
  preReserveKey: string;

  passengers: {
    gender: boolean;
    firstName: string;
    lastName: string;
    passengerType: CipPassengerType;
    passportNumber?: string;
    nationalId?: string;
    nationality?: string;
    birthday?: string;
    services: number[]
  }[];

  reserver: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    userName: string;
    gender: boolean;
  };

  services?: {
    count: number;
    extraCount?: number;
    hourCount?: number;
    id: number;
  }[];

  transports?: {
    count: number;
    address?: string;
    id: number;
  }[];

}

export interface CipGetReserveByIdResponse {
  // "adults": 0,
  // "children": 0,
  // "accompanying": 0,
  flightNumber: string;
  // "originName": "string",
  // "destinationName": "string",
  airline: string;
  flightTime: string;
  // "username": "string",
  // "creationTime": "2024-04-04T19:46:51.449Z",
  // "expireTime": "2024-04-04T19:46:51.449Z",
  // "status": "Undefined",
  // "rate": {
  //   "adults": 0,
  //   "children": 0,
  //   "accompanying": 0,
  //   "name": "string",
  //   "remark": "string",
  //   "description": "string",
  //   "boardPrice": 0,
  //   "netPrice": 0,
  //   "salePrice": 0,
  //   "passengers": [
  //     {
  //       "passengerType": "Adult",
  //       "boardPrice": 0,
  //       "netPrice": 0,
  //       "salePrice": 0,
  //       "currencyType": "USD",
  //       "id": 0
  //     }
  //   ],
  //   "id": 0
  // },
  reserver: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    userName: string;
    gender: boolean;
  };
  // "terminal": {
  //   "name": "string",
  //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  // },
  airport: {
    name: string;
    //"nameLong": "string",
    city: {
      name: string;
      code: string;
    };
    // "country": {
    //   "name": "string",
    //   "code": "string"
    // },
    // "code": "string",
    // "latitude": "string",
    // "longitude": "string",
    picture: {
      path: string;
      altAttribute: string;
      titleAttribute: string;
    },
    id: number;
  };
  // "promoCode": {
  //   "value": "string",
  //   "price": 0
  // },
  // "currencyType": "USD",
  // "totalBoardPrice": 0,
  // "totalNetPrice": 0,
  // "totalSalePrice": 0,
  passengers: [
    {
      gender: boolean;
      firstName: string;
      lastName: string;
      passengerType: CipPassengerType;
      passportNumber: string;
      nationalId: string;
      nationality: string;
      birthday: string,
      service: {
        // "boardPrice": 0,
        // "netPrice": 0,
        // "salePrice": 0,
        items: [
          {
            // "totalBoardPrice": 0,
            // "totalNetPrice": 0,
            // "totalSalePrice": 0,
            // "serviceId": 0,
            // "count": 0,
            // "extraCount": 0,
            // "hourCount": 0,
            // "airportId": 0,
            name: string;
            // "description": "string",
            // "hourDescription": "string",
            // "extraDescription": "string",
            // "title": "string",
            // "type": "Pet",
            // "priceType": "PerPassenger",
            // "boardPrice": 0,
            // "netPrice": 0,
            // "salePrice": 0,
            // "currencyType": "USD",
            // "passengerType": "Adult",
            // "extraSalePrice": 0,
            // "extraNetPrice": 0,
            // "extraBoardPrice": 0,
            // "hourSalePrice": 0,
            // "hourNetPrice": 0,
            // "hourBoardPrice": 0,
            picture: {
              path: string;
              altAttribute: string;
              titleAttribute: string;
            };
            // "airport": {
            //   "name": "string",
            //   "nameLong": "string",
            //   "city": {
            //     "name": "string",
            //     "code": "string"
            //   },
            //   "country": {
            //     "name": "string",
            //     "code": "string"
            //   },
            //   "code": "string",
            //   "latitude": "string",
            //   "longitude": "string",
            //   "picture": {
            //     "path": "string",
            //     "altAttribute": "string",
            //     "titleAttribute": "string"
            //   },
            //   "id": 0
            // },
            id: number
          }
        ]
      },
      id: number;
    }
  ],
  transport: {
    //   "boardPrice": 0,
    //   "netPrice": 0,
    //   salePrice: number;
    items: [
      {
        name: string;
        address: string;
        count: number;
        salePrice: number;
        picture: {
          path: string;
          altAttribute: string;
          titleAttribute: string;
        };
        //       "serviceId": 0,
        //       "description": "string",
        //       "boardPrice": 0,
        //       "netPrice": 0,
        //       "currencyType": "USD",
        //       "transportId": 0,
        //       "id": 0
      }
    ]
  };
  service: {
    // "boardPrice": 0,
    // "netPrice": 0,
    // "salePrice": 0,
    items: [
      {
        count: number;
        name: string;
        type: string;
        salePrice: number;
        picture: {
          path: string;
          altAttribute: string;
          titleAttribute: string;
        };
        //     "totalBoardPrice": 0,
        //     "totalNetPrice": 0,
        //     "totalSalePrice": 0,
        //     "serviceId": 0,
        //     "extraCount": 0,
        //     "hourCount": 0,
        //     "airportId": 0,
        //     "description": "string",
        //     "hourDescription": "string",
        //     "extraDescription": "string",
        //     "title": "string",
        //     "priceType": "PerPassenger",
        //     "boardPrice": 0,
        //     "netPrice": 0,
        //     "currencyType": "USD",
        //     "passengerType": "Adult",
        //     "extraSalePrice": 0,
        //     "extraNetPrice": 0,
        //     "extraBoardPrice": 0,
        //     "hourSalePrice": 0,
        //     "hourNetPrice": 0,
        //     "hourBoardPrice": 0,
        //     "picture": {
        //       "path": "string",
        //       "altAttribute": "string",
        //       "titleAttribute": "string"
        //     },
        //     "airport": {
        //       "name": "string",
        //       "nameLong": "string",
        //       "city": {
        //         "name": "string",
        //         "code": "string"
        //       },
        //       "country": {
        //         "name": "string",
        //         "code": "string"
        //       },
        //       "code": "string",
        //       "latitude": "string",
        //       "longitude": "string",
        //       "id": 0
        //     },
        //     "id": 0
      }
    ];
  };
  id: number;
}


export interface CipConfirmResponse {
  reserve?: {
    // "adults": 0,
    // "children": 0,
    // "accompanying": 0,
    // "flightNumber": "string",
    // "originName": "string",
    // "destinationName": "string",
    // "airline": "string",
    // "flightTime": "2024-04-05T09:47:21.254Z",
    // "username": "string",
    // "creationTime": "2024-04-05T09:47:21.254Z",
    // "expireTime": "2024-04-05T09:47:21.254Z",
    // "status": "Undefined",
    // "rate": {
    //   "adults": 0,
    //   "children": 0,
    //   "accompanying": 0,
    //   "name": "string",
    //   "remark": "string",
    //   "description": "string",
    //   "boardPrice": 0,
    //   "netPrice": 0,
    //   "salePrice": 0,
    //   "passengers": [
    //     {
    //       "passengerType": "Adult",
    //       "boardPrice": 0,
    //       "netPrice": 0,
    //       "salePrice": 0,
    //       "currencyType": "USD",
    //       "id": 0
    //     }
    //   ],
    //   "id": 0
    // },
    // "reserver": {
    //   "firstName": "string",
    //   "lastName": "string",
    //   "phoneNumber": "string",
    //   "email": "string",
    //   "userName": "string",
    //   "gender": true
    // },
    // "terminal": {
    //   "name": "string",
    //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    // },
    // "airport": {
    //   "name": "string",
    //   "nameLong": "string",
    //   "city": {
    //     "name": "string",
    //     "code": "string"
    //   },
    //   "country": {
    //     "name": "string",
    //     "code": "string"
    //   },
    //   "code": "string",
    //   "latitude": "string",
    //   "longitude": "string",
    //   "picture": {
    //     "path": "string",
    //     "altAttribute": "string",
    //     "titleAttribute": "string"
    //   },
    //   "id": 0
    // },
    // "promoCode": {
    //   "value": "string",
    //   "price": 0
    // },
    // "currencyType": "USD",
    // "totalBoardPrice": 0,
    // "totalNetPrice": 0,
    // "totalSalePrice": 0,
    // "passengers": [
    //   {
    //     "gender": true,
    //     "firstName": "string",
    //     "lastName": "string",
    //     "passengerType": "Adult",
    //     "passportNumber": "string",
    //     "nationalId": "string",
    //     "nationality": "AF",
    //     "birthday": "2024-04-05T09:47:21.254Z",
    //     "service": {
    //       "boardPrice": 0,
    //       "netPrice": 0,
    //       "salePrice": 0,
    //       "items": [
    //         {
    //           "totalBoardPrice": 0,
    //           "totalNetPrice": 0,
    //           "totalSalePrice": 0,
    //           "serviceId": 0,
    //           "count": 0,
    //           "extraCount": 0,
    //           "hourCount": 0,
    //           "airportId": 0,
    //           "name": "string",
    //           "description": "string",
    //           "hourDescription": "string",
    //           "extraDescription": "string",
    //           "title": "string",
    //           "type": "Pet",
    //           "priceType": "PerPassenger",
    //           "boardPrice": 0,
    //           "netPrice": 0,
    //           "salePrice": 0,
    //           "currencyType": "USD",
    //           "passengerType": "Adult",
    //           "extraSalePrice": 0,
    //           "extraNetPrice": 0,
    //           "extraBoardPrice": 0,
    //           "hourSalePrice": 0,
    //           "hourNetPrice": 0,
    //           "hourBoardPrice": 0,
    //           "picture": {
    //             "path": "string",
    //             "altAttribute": "string",
    //             "titleAttribute": "string"
    //           },
    //           "airport": {
    //             "name": "string",
    //             "nameLong": "string",
    //             "city": {
    //               "name": "string",
    //               "code": "string"
    //             },
    //             "country": {
    //               "name": "string",
    //               "code": "string"
    //             },
    //             "code": "string",
    //             "latitude": "string",
    //             "longitude": "string",
    //             "picture": {
    //               "path": "string",
    //               "altAttribute": "string",
    //               "titleAttribute": "string"
    //             },
    //             "id": 0
    //           },
    //           "id": 0
    //         }
    //       ]
    //     },
    //     "id": 0
    //   }
    // ],
    // "transport": {
    //   "boardPrice": 0,
    //   "netPrice": 0,
    //   "salePrice": 0,
    //   "items": [
    //     {
    //       "serviceId": 0,
    //       "name": "string",
    //       "description": "string",
    //       "address": "string",
    //       "count": 0,
    //       "boardPrice": 0,
    //       "netPrice": 0,
    //       "salePrice": 0,
    //       "currencyType": "USD",
    //       "transportId": 0,
    //       "picture": {
    //         "path": "string",
    //         "altAttribute": "string",
    //         "titleAttribute": "string"
    //       },
    //       "id": 0
    //     }
    //   ]
    // },
    // "service": {
    //   "boardPrice": 0,
    //   "netPrice": 0,
    //   "salePrice": 0,
    //   "items": [
    //     {
    //       "totalBoardPrice": 0,
    //       "totalNetPrice": 0,
    //       "totalSalePrice": 0,
    //       "serviceId": 0,
    //       "count": 0,
    //       "extraCount": 0,
    //       "hourCount": 0,
    //       "airportId": 0,
    //       "name": "string",
    //       "description": "string",
    //       "hourDescription": "string",
    //       "extraDescription": "string",
    //       "title": "string",
    //       "type": "Pet",
    //       "priceType": "PerPassenger",
    //       "boardPrice": 0,
    //       "netPrice": 0,
    //       "salePrice": 0,
    //       "currencyType": "USD",
    //       "passengerType": "Adult",
    //       "extraSalePrice": 0,
    //       "extraNetPrice": 0,
    //       "extraBoardPrice": 0,
    //       "hourSalePrice": 0,
    //       "hourNetPrice": 0,
    //       "hourBoardPrice": 0,
    //       "picture": {
    //         "path": "string",
    //         "altAttribute": "string",
    //         "titleAttribute": "string"
    //       },
    //       "airport": {
    //         "name": "string",
    //         "nameLong": "string",
    //         "city": {
    //           "name": "string",
    //           "code": "string"
    //         },
    //         "country": {
    //           "name": "string",
    //           "code": "string"
    //         },
    //         "code": "string",
    //         "latitude": "string",
    //         "longitude": "string",
    //         "picture": {
    //           "path": "string",
    //           "altAttribute": "string",
    //           "titleAttribute": "string"
    //         },
    //         "id": 0
    //       },
    //       "id": 0
    //     }
    //   ]
    // },
    // "id": 0
  },
  isCompleted: boolean;
}