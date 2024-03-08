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

export interface CipAvailabilityItemType {
    id: number;
    name: string;
    "adults": 0,
    "children": 0,
    "accompanying": 0,
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
    "transport": [
      {
        "name": "string",
        "description": "string",
        "boardPrice": 0,
        "netPrice": 0,
        "salePrice": 0,
        "currencyType": "USD",
        "picture": {
          "path": "string",
          "altAttribute": "string",
          "titleAttribute": "string"
        },
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
  }