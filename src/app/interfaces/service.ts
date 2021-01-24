import { Attribute } from './attribute';
export interface Service {
    id: number;
    name: string;
    explain: string;
    category: any;
    mothers: Array<any>;
    sellers: Array<any>;
    images: Array<string>;
    brand_id: number;
    quality: string;
    status: string;
    user_id: number;
    variables: Array<string>;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface MotherService {
    id: number;
    name: string;
    explain: string;
    category: any;
    childs: Array<any>;
    images: Array<string>;
    status: string;
    user_id: number;
    attributes: Array<Attribute>;
    seller_attributes: Array<number>;
}

export interface SellerService {
    service: any;
    min_orderable: number;
    max_orderable: number;
    wholesale_threshold: number;
    prices: Array<any>;
    supply_time: number;
    stars: any;
    sell_types: Array<string>;
    qualities: Array<string>;
    condition: boolean;
    is_suggested: boolean;
    disscounts: Array<any>;
    attributes: Array<any>;
}
