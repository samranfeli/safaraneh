export interface EntitySearchResultItemType {
    name?: string;
    displayName?: string;
    language?: string;
    type: 'Province' | 'City' | 'Hotel';
    id: number;
}