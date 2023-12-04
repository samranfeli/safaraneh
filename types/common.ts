export type TabItem = {
    key: string | number;
    label: React.ReactNode;
    children: React.ReactNode;
};

export interface PageDataType {
    Id?: number;
    PageName?: string;
    Url?: string;
    PageTitle?: string;
    MetaTags?: {
        Name: string;
        Content: string
    }[];
}

export interface PortalDataType {
    PortalName?: string;
    JavaScript?: string;
    Style?: string;
    CDNPath?: string;
    IsSecureConnection?: boolean;
    Modules: any[],
    Apikeys: {
        IdPortalApi: number;
        PortalId: number;
        ApiName: string;
        ApiKey: string;
        BaseUrl: string;
    }[];
    Phrases:{
        Keyword?: string;
        Value?: string;
        CssClass?: string;
        Url?: string;
        ImageUrl?: string;
        ImageAlt?: string;
        ImageTitle?: string;
    }[];
    MetaTags: {
        Name?: string;
        Content?: string;
    }[],
    EmailServer: unknown
}