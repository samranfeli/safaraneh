export interface EntitySearchResultItemType {
    name?: string;
    displayName?: string;
    language?: string;
    type: 'Province' | 'City' | 'Hotel';
    id: number;
}

interface DomesticHotelFacilitieType {
    FacilityId?: number;
    Title?: string;
    Image?: string;
    ImageUrl?: string;
    Keyword?: string;
    ImageAlt?: string;
    ImageTitle?: string;
    CssClass?: string;
    Description?: string;
    IsSpecial?: boolean;
}

interface DomesticHotelMainType {
    HotelId?: number;
    HotelName?: string;
    CityName?: string;
    HotelTypeName?: string;
    HotelRating?: number;
    BriefDescription?: string;
    Url?: string;
    ImageUrl?: string;
    ImageTitle?: string;
    ImageAlt?: string;
    Address?: string;
    Discount?: number;
    Price?: number;
    Facilities?: DomesticHotelFacilitieType[];
}

interface DomesticHotelNearBy extends DomesticHotelMainType {
    DistanceText?: string;
    DistanceValue?: number;
}

export interface DomesticHotelDetailType {
    HotelId?: number;
    HotelName?: string;
    HotelCategoryName?: string;
    HotelCategoryId?: number;
    CityName?: string;
    CityId?: number;
    HotelRating?: number;
    IsInstant?: boolean;
    Tel?: string;
    Address?: string;
    BriefDescription?: string;
    Content?: string;
    ContentTitle?: string;
    Latitude?: number;
    Longitude?: number;
    Zoom?: number;
    Priority?: number;
    Url?: string;
    Discount?: number;
    TopSelling?: number;
    Price?: number;
    IsPromotion?: boolean;
    MostViewed?: number;
    ImageAlt?: string;
    ImageTitle?: string;
    ImageUrl?: string;
    LanguageId?: number;
    IsCovid?: boolean;
    ChangeFrequency?: string;
    PagePriority?: number;
    ModifyDateTime?: string;
    MetaDescription?: string;
    MetaKeyword?: string;
    PageTitle?: string;
    VoteNumbers?: number;
    VoteResult?: number;
    RoomCount?: number;
    NeighborhoodKeywords?: {

    }[];
    Gallery?: {
        Image?: string;
        ImageThumb?: string;
        Alt?: string;
        Title?: string;
        Priority?: number;
    }[];
    Facilities?: DomesticHotelFacilitieType[];

    Policies?: {

    }[];
    DistancePoints?: {

    }[];
    DistancePointTemporarys?: {

    }[];
    Similars?: DomesticHotelMainType[];
    NearBys?: DomesticHotelNearBy[]
}