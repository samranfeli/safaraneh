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
    latitude?:string;
    longitude?:string;
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
    // "code": "string",
    // "picture": {
    //     "path": "string",
    //     "altAttribute": "string",
    //     "titleAttribute": "string"
    // },
    // "id": 0
}