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