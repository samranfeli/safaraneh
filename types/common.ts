export type TabItem = {
    key: string | number;
    label: React.ReactNode;
    children: React.ReactNode;
};

export interface PageDataType {
    Id?:number;
    PageName?:string;
    Url?:string;
    PageTitle?:string;
    MetaTags?:{
        Name:string;
        Content:string
    }[];
}