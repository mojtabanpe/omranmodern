export interface ExtraAdded {
    provinces: Array<any>;
    cities: Array<any>;
    zones: Array<string>;
    selectedProvince: number;
    selectedCity: number;
    selectedZone: string;
}
export interface ExtraAddress {
    type: string;
    extraAdded: ExtraAdded;
    detail: string;
}

export interface Address {
    type: string;
    province: string;
    city: string;
    zone: string;
    detail: string;
}